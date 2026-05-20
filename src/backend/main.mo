import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import BillingTypes "types/billing";
import UserTypes "types/users";
import Common "types/common";
import BillingMixin "mixins/billing-api";
import UsersMixin "mixins/users-api";
import Migration "migration";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";

(with migration = Migration.run)
actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User state
  let userProfiles = Map.empty<Common.UserId, UserTypes.UserProfile>();
  let teamMembers = Map.empty<Common.UserId, UserTypes.TeamMember>();
  let usage = Map.empty<Text, UserTypes.UsageRecord>();

  // Billing state
  let subscriptions = Map.empty<Common.UserId, BillingTypes.Subscription>();
  let invoices = Map.empty<Text, BillingTypes.Invoice>();
  let transactions = Map.empty<Text, BillingTypes.Transaction>();
  let stripeConfig = { var config : ?Stripe.StripeConfiguration = null };
  let billingState = { var nextInvoiceId = 0; var nextTxId = 0 };

  // Include domain mixins
  include UsersMixin(accessControlState, userProfiles, teamMembers, usage);
  include BillingMixin(accessControlState, userProfiles, subscriptions, invoices, transactions, stripeConfig, billingState);

  // Stripe-required actor-level declarations
  public query func isStripeConfigured() : async Bool {
    stripeConfig.config != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig.config := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfig.config) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
  };

  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
