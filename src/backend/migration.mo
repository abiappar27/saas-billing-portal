import Map "mo:core/Map";
import Principal "mo:core/Principal";
import UserTypes "types/users";
import Common "types/common";
import BillingTypes "types/billing";
import Stripe "mo:caffeineai-stripe/stripe";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  // ── Old types (inline, from previous actor version) ──────────────────────

  type OldUserProfile = {
    name : Text;
  };

  type OldAnomalyType = { #suspicious; #poisoned; #clean };
  type OldAnomalyStatus = { #suspected; #confirmed };
  type OldRecordClassification = { anomalyType : OldAnomalyType; anomalyStatus : ?OldAnomalyStatus };
  type OldNormalization = {
    natValidatorsCount : Nat;
    normalizedScore : Float;
    avgTrustScore : Float;
    trustedSigners : [Principal];
    suspected : { hasPoison : Bool; confoundingFields : [Nat]; multiAnomalies : [Nat] };
  };
  type OldPreprocessingSummary = { missingValues : Nat; normalization : OldNormalization };
  type OldPoisonCounts = { confirmed : Nat; suspected : Nat };
  type OldAnomalyDetectionResults = {
    counts : { suspicious : Nat; clean : Nat; poisoned : OldPoisonCounts };
    records : [OldRecordClassification];
    anomalyPrevalence : { key : Text; value : Float };
  };
  type OldAnalysisResults = {
    preprocessing : OldPreprocessingSummary;
    anomalyDetection : OldAnomalyDetectionResults;
    timestamp : Int;
  };
  type OldVisibility = { #privateScope; #sharedScope; #publicScope };
  type OldDatasetItem = {
    name : Text;
    hash : Text;
    records : [[?Text]];
    analysis : OldAnalysisResults;
    createdAt : Int;
    burned : Bool;
    visibility : OldVisibility;
    sharedWith : [Principal];
  };
  type OldUserAnalysisState = {
    datasets : Map.Map<Text, OldDatasetItem>;
  };

  // ── Domain types for the record shapes ───────────────────────────────────

  type OldActor = {
    userStates : Map.Map<Principal, OldUserAnalysisState>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
    accessControlState : AccessControl.AccessControlState;
  };

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    userProfiles : Map.Map<Common.UserId, UserTypes.UserProfile>;
    teamMembers : Map.Map<Common.UserId, UserTypes.TeamMember>;
    usage : Map.Map<Text, UserTypes.UsageRecord>;
    subscriptions : Map.Map<Common.UserId, BillingTypes.Subscription>;
    invoices : Map.Map<Text, BillingTypes.Invoice>;
    transactions : Map.Map<Text, BillingTypes.Transaction>;
    stripeConfig : { var config : ?Stripe.StripeConfiguration };
    billingState : { var nextInvoiceId : Nat; var nextTxId : Nat };
  };

  // ── Migration function ────────────────────────────────────────────────────
  //
  // - userStates is intentionally discarded (old dataset data not compatible)
  // - userProfiles are migrated: old {name} → new UserProfile with all fields
  //   defaulted (userId = principal, email = "", role = #customer,
  //   billingAddress = null, createdAt = 0)

  public func run(old : OldActor) : NewActor {
    let newProfiles = old.userProfiles.map<Principal, OldUserProfile, UserTypes.UserProfile>(
      func(principalId, oldProfile) {
        {
          userId = principalId;
          name = oldProfile.name;
          email = "";
          role = #customer;
          billingAddress = null;
          createdAt = 0;
        };
      }
    );

    {
      accessControlState = old.accessControlState;
      userProfiles = newProfiles;
      teamMembers = Map.empty<Common.UserId, UserTypes.TeamMember>();
      usage = Map.empty<Text, UserTypes.UsageRecord>();
      subscriptions = Map.empty<Common.UserId, BillingTypes.Subscription>();
      invoices = Map.empty<Text, BillingTypes.Invoice>();
      transactions = Map.empty<Text, BillingTypes.Transaction>();
      stripeConfig = { var config = null };
      billingState = { var nextInvoiceId = 0; var nextTxId = 0 };
    };
  };
};
