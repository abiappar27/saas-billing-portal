import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTeamMembers } from "@/hooks/useQueries";
import { TeamMemberStatus, UserRole } from "@/types";
import { ShieldCheck, UserCheck, UserX, Users } from "lucide-react";

const mockTeam = [
  {
    status: TeamMemberStatus.active,
    joinDate: BigInt(Date.now() - 31536000000),
    name: "Alice Chen",
    email: "alice@example.com",
    role: UserRole.admin,
    invitedBy: "" as unknown as import("@/backend").UserId,
    principalId: "u1" as unknown as import("@/backend").UserId,
  },
  {
    status: TeamMemberStatus.active,
    joinDate: BigInt(Date.now() - 15768000000),
    name: "Bob Patel",
    email: "bob@example.com",
    role: UserRole.manager,
    invitedBy: "" as unknown as import("@/backend").UserId,
    principalId: "u2" as unknown as import("@/backend").UserId,
  },
  {
    status: TeamMemberStatus.active,
    joinDate: BigInt(Date.now() - 7884000000),
    name: "Carol Wu",
    email: "carol@example.com",
    role: UserRole.customer,
    invitedBy: "" as unknown as import("@/backend").UserId,
    principalId: "u3" as unknown as import("@/backend").UserId,
  },
  {
    status: TeamMemberStatus.suspended,
    joinDate: BigInt(Date.now() - 2592000000),
    name: "Dan Ortiz",
    email: "dan@example.com",
    role: UserRole.customer,
    invitedBy: "" as unknown as import("@/backend").UserId,
    principalId: "u4" as unknown as import("@/backend").UserId,
  },
];

const statusIcon = (s: TeamMemberStatus) =>
  s === TeamMemberStatus.active ? (
    <UserCheck size={14} className="text-primary" />
  ) : (
    <UserX size={14} className="text-destructive" />
  );

const roleLabel = (r: UserRole) =>
  r === UserRole.admin
    ? "Admin"
    : r === UserRole.manager
      ? "Manager"
      : "Customer";

const roleBadgeClass = (r: UserRole) =>
  r === UserRole.admin
    ? "bg-destructive/10 text-destructive border-destructive/30"
    : r === UserRole.manager
      ? "bg-accent/10 text-accent border-accent/30"
      : "bg-primary/10 text-primary border-primary/30";

export default function TeamPage() {
  const { data: members = [], isLoading } = useTeamMembers();
  const display = members.length > 0 ? members : mockTeam;

  return (
    <div className="space-y-6" data-ocid="team.page">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Team Members
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage access and roles for your organization
        </p>
      </div>

      <Card data-ocid="team.members_card">
        <CardHeader className="flex flex-row items-center gap-3">
          <Users size={20} className="text-primary" />
          <CardTitle className="text-base">All Members</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="h-12 w-full" />
              ))}
            </div>
          ) : display.length === 0 ? (
            <p
              className="text-sm text-muted-foreground py-6 text-center"
              data-ocid="team.empty_state"
            >
              No team members yet.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {display.map((m, idx) => (
                <div
                  key={String(m.principalId)}
                  className="flex items-center justify-between py-3"
                  data-ocid={`team.member_row.${idx + 1}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold shrink-0">
                      {m.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {m.name ?? "Unknown"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {m.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className={roleBadgeClass(m.role)}>
                      {roleLabel(m.role)}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {statusIcon(m.status)}
                      {String(m.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
