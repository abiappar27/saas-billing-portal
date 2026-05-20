import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Users "../types/users";
import Common "../types/common";
import Principal "mo:core/Principal";

module {
  // ──────────────────────────────────────────────────────────────────────────
  // User profiles
  // ──────────────────────────────────────────────────────────────────────────

  public func getProfile(
    map : Map.Map<Common.UserId, Users.UserProfile>,
    userId : Common.UserId,
  ) : ?Users.UserProfile {
    map.get(userId)
  };

  public func putProfile(
    map : Map.Map<Common.UserId, Users.UserProfile>,
    profile : Users.UserProfile,
  ) {
    map.add(profile.userId, profile);
  };

  public func saveProfile(
    map : Map.Map<Common.UserId, Users.UserProfile>,
    profile : Users.UserProfile,
  ) {
    map.add(profile.userId, profile);
  };

  public func listAllProfiles(
    map : Map.Map<Common.UserId, Users.UserProfile>,
  ) : [Users.UserProfile] {
    map.values().toArray()
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Team members
  // ──────────────────────────────────────────────────────────────────────────

  public func getTeamMembers(
    map : Map.Map<Common.UserId, Users.TeamMember>,
  ) : [Users.TeamMember] {
    map.values().toArray()
  };

  public func putTeamMember(
    map : Map.Map<Common.UserId, Users.TeamMember>,
    member : Users.TeamMember,
  ) {
    map.add(member.principalId, member);
  };

  public func addTeamMember(
    map : Map.Map<Common.UserId, Users.TeamMember>,
    member : Users.TeamMember,
  ) {
    map.add(member.principalId, member);
  };

  public func removeTeamMember(
    map : Map.Map<Common.UserId, Users.TeamMember>,
    id : Common.UserId,
  ) {
    map.remove(id);
  };

  public func updateTeamMemberStatus(
    map : Map.Map<Common.UserId, Users.TeamMember>,
    id : Common.UserId,
    status : Users.TeamMemberStatus,
  ) {
    switch (map.get(id)) {
      case (?member) {
        map.add(id, { member with status });
      };
      case null {};
    };
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Usage tracking
  // ──────────────────────────────────────────────────────────────────────────

  public func usageKey(userId : Common.UserId, year : Nat, month : Nat) : Text {
    userId.toText() # "-" # year.toText() # "-" # month.toText()
  };

  public func recordApiCall(
    map : Map.Map<Text, Users.UsageRecord>,
    userId : Common.UserId,
    year : Nat,
    month : Nat,
  ) {
    let key = usageKey(userId, year, month);
    let count = switch (map.get(key)) {
      case null 1;
      case (?rec) rec.apiCallCount + 1;
    };
    let rec : Users.UsageRecord = {
      userId;
      year;
      month;
      apiCallCount = count;
    };
    map.add(key, rec);
  };

  public func getUsage(
    map : Map.Map<Text, Users.UsageRecord>,
    userId : Common.UserId,
    year : Nat,
    month : Nat,
  ) : ?Users.UsageRecord {
    map.get(usageKey(userId, year, month))
  };
};
