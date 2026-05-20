import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Stripe "mo:caffeineai-stripe/stripe";
import Common "../types/common";
import BillingTypes "../types/billing";
import BillingLib "../lib/billing";
import UserTypes "../types/users";
import UserLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
  subscriptions : Map.Map<Common.UserId, BillingTypes.Subscription>,
  invoices : Map.Map<Text, BillingTypes.Invoice>,
  transactions : Map.Map<Text, BillingTypes.Transaction>,
  stripeConfig : { var config : ?Stripe.StripeConfiguration },
  state : { var nextInvoiceId : Nat; var nextTxId : Nat },
) {
  func requireBillingAdmin(caller : Principal) : () {
    let profile = UserLib.getProfile(userProfiles, caller);
    switch (profile) {
      case (?p) {
        if (p.role != #admin) Runtime.trap("Access denied: admin only");
      };
      case null Runtime.trap("Access denied: no profile");
    };
  };

  func nanosToNextBillingDate(period : BillingTypes.BillingPeriod) : Common.Timestamp {
    let now = Time.now();
    let secondsInMonth : Int = 30 * 24 * 3600;
    let secondsInYear : Int = 365 * 24 * 3600;
    let seconds = switch (period) {
      case (#monthly) secondsInMonth;
      case (#annual) secondsInYear;
    };
    now + seconds * 1_000_000_000;
  };

  // Plan catalog
  public query func getPlans() : async [BillingTypes.PlanConfig] {
    BillingLib.getPlans();
  };

  // Caller's subscription
  public query ({ caller }) func getMySubscription() : async ?BillingTypes.Subscription {
    BillingLib.getSubscription(subscriptions, caller);
  };

  // Admin or manager: get any user's subscription
  public query ({ caller }) func getUserSubscription(userId : Common.UserId) : async ?BillingTypes.Subscription {
    requireBillingAdmin(caller);
    BillingLib.getSubscription(subscriptions, userId);
  };

  // Admin: manually set a user's plan
  public shared ({ caller }) func adminSetSubscription(
    userId : Common.UserId,
    tier : BillingTypes.PlanTier,
    billingPeriod : BillingTypes.BillingPeriod,
  ) : async () {
    requireBillingAdmin(caller);
    let sub : BillingTypes.Subscription = {
      userId = userId;
      tier = tier;
      billingPeriod = billingPeriod;
      status = #active;
      startDate = Time.now();
      nextBillingDate = nanosToNextBillingDate(billingPeriod);
      stripeSubscriptionId = null;
      stripeCustomerId = null;
    };
    BillingLib.createOrUpdateSubscription(subscriptions, sub);
  };

  // Cancel the caller's subscription
  public shared ({ caller }) func cancelMySubscription() : async () {
    BillingLib.cancelSubscription(subscriptions, caller);
  };

  // Invoices
  public query ({ caller }) func getMyInvoices() : async [BillingTypes.Invoice] {
    BillingLib.listUserInvoices(invoices, caller);
  };

  public query ({ caller }) func getMyInvoice(invoiceId : Text) : async ?BillingTypes.Invoice {
    switch (BillingLib.getInvoice(invoices, invoiceId)) {
      case (?inv) {
        if (inv.userId == caller) ?inv else null;
      };
      case null null;
    };
  };

  // Admin: all invoices
  public query ({ caller }) func getAllInvoices() : async [BillingTypes.Invoice] {
    requireBillingAdmin(caller);
    BillingLib.listAllInvoices(invoices);
  };

  // Transactions
  public query ({ caller }) func getMyTransactions() : async [BillingTypes.Transaction] {
    BillingLib.listUserTransactions(transactions, caller);
  };

  // Admin: all transactions
  public query ({ caller }) func getAllTransactions() : async [BillingTypes.Transaction] {
    requireBillingAdmin(caller);
    BillingLib.listAllTransactions(transactions);
  };

  // Stripe: confirm payment and upgrade subscription after redirect
  public shared ({ caller }) func confirmPayment(
    sessionId : Text,
    tier : BillingTypes.PlanTier,
    billingPeriod : BillingTypes.BillingPeriod,
  ) : async BillingTypes.Transaction {
    let plan = switch (BillingLib.getPlan(tier)) {
      case (?p) p;
      case null Runtime.trap("Unknown plan tier");
    };
    let amountCents = switch (billingPeriod) {
      case (#monthly) plan.monthlyPriceCents;
      case (#annual) plan.annualPriceCents;
    };
    let txId = BillingLib.generateTransactionId(state);
    let tx : BillingTypes.Transaction = {
      id = txId;
      userId = caller;
      stripePaymentIntentId = sessionId;
      amountCents = amountCents;
      currency = "usd";
      status = #succeeded;
      description = "Subscription upgrade to " # plan.name # " (" # debug_show(billingPeriod) # ")";
      createdAt = Time.now();
    };
    BillingLib.addTransaction(transactions, tx);
    // Create invoice
    let invId = BillingLib.generateInvoiceId(state);
    let now = Time.now();
    let inv : BillingTypes.Invoice = {
      id = invId;
      userId = caller;
      amountCents = amountCents;
      currency = "usd";
      description = "Invoice for " # plan.name # " subscription";
      status = #paid;
      createdAt = now;
      paidAt = ?now;
      stripeInvoiceId = ?sessionId;
      downloadData = ?("Invoice " # invId # " | " # plan.name # " | $" # debug_show(amountCents / 100));
    };
    BillingLib.addInvoice(invoices, inv);
    // Activate/update subscription
    let sub : BillingTypes.Subscription = {
      userId = caller;
      tier = tier;
      billingPeriod = billingPeriod;
      status = #active;
      startDate = now;
      nextBillingDate = nanosToNextBillingDate(billingPeriod);
      stripeSubscriptionId = ?sessionId;
      stripeCustomerId = null;
    };
    BillingLib.createOrUpdateSubscription(subscriptions, sub);
    tx;
  };
};
