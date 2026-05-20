import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Billing "../types/billing";
import Common "../types/common";
import Array "mo:core/Array";
import Nat "mo:core/Nat";

module {
  // ──────────────────────────────────────────────────────────────────────────
  // Plan catalogue (static config)
  // ──────────────────────────────────────────────────────────────────────────

  public func getPlans() : [Billing.PlanConfig] {
    [
      {
        tier = #free;
        name = "Free";
        description = "Get started with core features at no cost.";
        monthlyPriceCents = 0;
        annualPriceCents = 0;
        features = ["1 seat", "100 API calls/month", "Community support"];
        apiCallLimit = 100;
      },
      {
        tier = #pro;
        name = "Pro";
        description = "For growing teams that need more power.";
        monthlyPriceCents = 2900;
        annualPriceCents = 29000;
        features = ["5 seats", "10 000 API calls/month", "Email support", "Analytics"];
        apiCallLimit = 10_000;
      },
      {
        tier = #enterprise;
        name = "Enterprise";
        description = "Unlimited scale with dedicated support.";
        monthlyPriceCents = 14900;
        annualPriceCents = 149000;
        features = ["Unlimited seats", "Unlimited API calls", "Priority support", "SLA", "Custom integrations"];
        apiCallLimit = 1_000_000_000;
      },
    ]
  };

  public func getPlan(tier : Billing.PlanTier) : ?Billing.PlanConfig {
    let plans = getPlans();
    for (p in plans.values()) {
      if (p.tier == tier) return ?p;
    };
    null
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Subscriptions
  // ──────────────────────────────────────────────────────────────────────────

  public func getSubscription(
    map : Map.Map<Common.UserId, Billing.Subscription>,
    userId : Common.UserId,
  ) : ?Billing.Subscription {
    map.get(userId)
  };

  public func putSubscription(
    map : Map.Map<Common.UserId, Billing.Subscription>,
    sub : Billing.Subscription,
  ) {
    map.add(sub.userId, sub);
  };

  public func createOrUpdateSubscription(
    map : Map.Map<Common.UserId, Billing.Subscription>,
    sub : Billing.Subscription,
  ) {
    map.add(sub.userId, sub);
  };

  public func cancelSubscription(
    map : Map.Map<Common.UserId, Billing.Subscription>,
    userId : Common.UserId,
  ) {
    switch (map.get(userId)) {
      case null {};
      case (?sub) {
        map.add(userId, { sub with status = #cancelled });
      };
    };
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Invoices
  // ──────────────────────────────────────────────────────────────────────────

  public func getInvoice(
    map : Map.Map<Text, Billing.Invoice>,
    id : Text,
  ) : ?Billing.Invoice {
    map.get(id)
  };

  public func putInvoice(
    map : Map.Map<Text, Billing.Invoice>,
    inv : Billing.Invoice,
  ) {
    map.add(inv.id, inv);
  };

  public func addInvoice(
    map : Map.Map<Text, Billing.Invoice>,
    inv : Billing.Invoice,
  ) {
    map.add(inv.id, inv);
  };

  public func generateInvoiceId(
    state : { var nextInvoiceId : Nat; var nextTxId : Nat },
  ) : Text {
    state.nextInvoiceId += 1;
    "INV-" # state.nextInvoiceId.toText();
  };

  public func listUserInvoices(
    map : Map.Map<Text, Billing.Invoice>,
    userId : Common.UserId,
  ) : [Billing.Invoice] {
    map.values().filter(func(inv : Billing.Invoice) : Bool { inv.userId == userId }).toArray()
  };

  public func listAllInvoices(
    map : Map.Map<Text, Billing.Invoice>,
  ) : [Billing.Invoice] {
    map.values().toArray()
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Transactions
  // ──────────────────────────────────────────────────────────────────────────

  public func putTransaction(
    map : Map.Map<Text, Billing.Transaction>,
    tx : Billing.Transaction,
  ) {
    map.add(tx.id, tx);
  };

  public func addTransaction(
    map : Map.Map<Text, Billing.Transaction>,
    tx : Billing.Transaction,
  ) {
    map.add(tx.id, tx);
  };

  public func generateTransactionId(
    state : { var nextInvoiceId : Nat; var nextTxId : Nat },
  ) : Text {
    state.nextTxId += 1;
    "TX-" # state.nextTxId.toText();
  };

  public func listUserTransactions(
    map : Map.Map<Text, Billing.Transaction>,
    userId : Common.UserId,
  ) : [Billing.Transaction] {
    map.values().filter(func(tx : Billing.Transaction) : Bool { tx.userId == userId }).toArray()
  };

  public func listAllTransactions(
    map : Map.Map<Text, Billing.Transaction>,
  ) : [Billing.Transaction] {
    map.values().toArray()
  };


};
