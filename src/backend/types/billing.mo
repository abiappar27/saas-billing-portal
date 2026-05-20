import Common "common";

module {
  public type PlanTier = {
    #free;
    #pro;
    #enterprise;
  };

  public type BillingPeriod = {
    #monthly;
    #annual;
  };

  public type SubscriptionStatus = {
    #active;
    #cancelled;
    #pastDue;
    #trialing;
  };

  public type PlanConfig = {
    tier : PlanTier;
    monthlyPriceCents : Nat;
    annualPriceCents : Nat;
    name : Text;
    description : Text;
    features : [Text];
    apiCallLimit : Nat;
  };

  public type Subscription = {
    userId : Common.UserId;
    tier : PlanTier;
    billingPeriod : BillingPeriod;
    status : SubscriptionStatus;
    startDate : Common.Timestamp;
    nextBillingDate : Common.Timestamp;
    stripeSubscriptionId : ?Text;
    stripeCustomerId : ?Text;
  };

  public type InvoiceStatus = {
    #pending;
    #paid;
    #failed;
    #refunded;
  };

  public type Invoice = {
    id : Text;
    userId : Common.UserId;
    amountCents : Nat;
    currency : Text;
    description : Text;
    status : InvoiceStatus;
    createdAt : Common.Timestamp;
    paidAt : ?Common.Timestamp;
    stripeInvoiceId : ?Text;
    downloadData : ?Text;
  };

  public type TransactionStatus = {
    #succeeded;
    #pending;
    #failed;
    #refunded;
  };

  public type Transaction = {
    id : Text;
    userId : Common.UserId;
    stripePaymentIntentId : Text;
    amountCents : Nat;
    currency : Text;
    status : TransactionStatus;
    description : Text;
    createdAt : Common.Timestamp;
  };
};
