import Common "common";

module {
  public type UserRole = {
    #admin;
    #manager;
    #customer;
  };

  public type UserProfile = {
    userId : Common.UserId;
    name : Text;
    email : Text;
    role : UserRole;
    billingAddress : ?BillingAddress;
    createdAt : Common.Timestamp;
  };

  public type BillingAddress = {
    line1 : Text;
    line2 : ?Text;
    city : Text;
    state : ?Text;
    postalCode : Text;
    country : Text;
  };

  public type TeamMemberStatus = {
    #active;
    #suspended;
    #pending;
  };

  public type TeamMember = {
    principalId : Common.UserId;
    name : Text;
    email : Text;
    role : UserRole;
    joinDate : Common.Timestamp;
    status : TeamMemberStatus;
    invitedBy : Common.UserId;
  };

  public type UsageRecord = {
    userId : Common.UserId;
    year : Nat;
    month : Nat;
    apiCallCount : Nat;
  };
};
