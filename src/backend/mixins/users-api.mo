import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UserTypes "../types/users";
import UserLib "../lib/users";
import Int "mo:core/Int";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
  teamMembers : Map.Map<Common.UserId, UserTypes.TeamMember>,
  usage : Map.Map<Text, UserTypes.UsageRecord>,
) {
  func requireUsersAdmin(caller : Principal) : () {
    let profile = UserLib.getProfile(userProfiles, caller);
    switch (profile) {
      case (?p) {
        if (p.role != #admin) Runtime.trap("Access denied: admin only");
      };
      case null Runtime.trap("Access denied: no profile");
    };
  };

  func requireManagerOrAdmin(caller : Principal) : () {
    let profile = UserLib.getProfile(userProfiles, caller);
    switch (profile) {
      case (?p) {
        switch (p.role) {
          case (#admin or #manager) {};
          case _ Runtime.trap("Access denied: manager or admin only");
        };
      };
      case null Runtime.trap("Access denied: no profile");
    };
  };

  // Profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfile {
    UserLib.getProfile(userProfiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserTypes.UserProfile) : async () {
    // Enforce userId matches caller
    let sanitized : UserTypes.UserProfile = {
      userId = caller;
      name = profile.name;
      email = profile.email;
      role = switch (UserLib.getProfile(userProfiles, caller)) {
        case (?existing) existing.role; // preserve role — only admin can change it
        case null #customer;
      };
      billingAddress = profile.billingAddress;
      createdAt = switch (UserLib.getProfile(userProfiles, caller)) {
        case (?existing) existing.createdAt;
        case null Time.now();
      };
    };
    UserLib.saveProfile(userProfiles, sanitized);
  };

  public query ({ caller }) func getUserProfile(userId : Common.UserId) : async ?UserTypes.UserProfile {
    ignore caller;
    UserLib.getProfile(userProfiles, userId);
  };

  // Admin: list all user profiles
  public query ({ caller }) func listAllUsers() : async [UserTypes.UserProfile] {
    requireUsersAdmin(caller);
    UserLib.listAllProfiles(userProfiles);
  };

  // Admin: change a user's role
  public shared ({ caller }) func setUserRole(
    userId : Common.UserId,
    role : UserTypes.UserRole,
  ) : async () {
    requireUsersAdmin(caller);
    switch (UserLib.getProfile(userProfiles, userId)) {
      case (?existing) {
        let updated : UserTypes.UserProfile = {
          userId = existing.userId;
          name = existing.name;
          email = existing.email;
          role = role;
          billingAddress = existing.billingAddress;
          createdAt = existing.createdAt;
        };
        UserLib.saveProfile(userProfiles, updated);
      };
      case null Runtime.trap("User not found");
    };
  };

  // Team members
  public query ({ caller }) func getTeamMembers() : async [UserTypes.TeamMember] {
    requireManagerOrAdmin(caller);
    UserLib.getTeamMembers(teamMembers);
  };

  public shared ({ caller }) func inviteTeamMember(
    memberId : Common.UserId,
    name : Text,
    email : Text,
    role : UserTypes.UserRole,
  ) : async () {
    requireManagerOrAdmin(caller);
    let member : UserTypes.TeamMember = {
      principalId = memberId;
      name = name;
      email = email;
      role = role;
      joinDate = Time.now();
      status = #pending;
      invitedBy = caller;
    };
    UserLib.addTeamMember(teamMembers, member);
  };

  public shared ({ caller }) func updateTeamMemberStatus(
    memberId : Common.UserId,
    status : UserTypes.TeamMemberStatus,
  ) : async () {
    requireManagerOrAdmin(caller);
    UserLib.updateTeamMemberStatus(teamMembers, memberId, status);
  };

  public shared ({ caller }) func removeTeamMember(memberId : Common.UserId) : async () {
    requireManagerOrAdmin(caller);
    UserLib.removeTeamMember(teamMembers, memberId);
  };

  // Usage tracking
  public query ({ caller }) func getMyUsage(year : Nat, month : Nat) : async ?UserTypes.UsageRecord {
    UserLib.getUsage(usage, caller, year, month);
  };

  public query ({ caller }) func getUserUsage(
    userId : Common.UserId,
    year : Nat,
    month : Nat,
  ) : async ?UserTypes.UsageRecord {
    requireManagerOrAdmin(caller);
    UserLib.getUsage(usage, userId, year, month);
  };

  // Record an API call (called internally, but exposed for accounting)
  public shared ({ caller }) func recordApiCall() : async () {
    let now = Time.now();
    // Approximate year/month from nanosecond timestamp using fixed-point math
    let secondsSinceEpoch : Nat = if (now > 0) { Int.abs(now) / 1_000_000_000 } else { 0 };
    let daysSinceEpoch = secondsSinceEpoch / 86400;
    // Shift epoch: Jan 1 1970 => offset from year 0 is 719468 days
    let z = daysSinceEpoch + 719468;
    let era = z / 146097;
    let doe = z - era * 146097;
    let yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let doy = doe - (365 * yoe + yoe / 4 - (if (yoe > 0) yoe / 100 else 0));
    let mp = (5 * doy + 2) / 153;
    let month : Nat = if (mp < 10) mp + 3 else mp - 9;
    let year : Nat = era * 400 + yoe + (if (month <= 2) 1 else 0);
    UserLib.recordApiCall(usage, caller, year, month);
  };
};
