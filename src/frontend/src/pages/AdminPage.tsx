import type { UserProfile } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAllInvoices,
  useAllTransactions,
  useListAllUsers,
} from "@/hooks/useQueries";
import { InvoiceStatus } from "@/types";
import {
  AlertCircle,
  DollarSign,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

const statCards = [
  {
    label: "Total Revenue",
    value: "$128,450",
    delta: "+12.4%",
    icon: DollarSign,
    color: "text-primary",
  },
  {
    label: "Active Users",
    value: "2,340",
    delta: "+8.1%",
    icon: Users,
    color: "text-accent",
  },
  {
    label: "Subscriptions",
    value: "1,893",
    delta: "+5.6%",
    icon: TrendingUp,
    color: "text-primary",
  },
  {
    label: "Open Issues",
    value: "7",
    delta: "-2",
    icon: AlertCircle,
    color: "text-destructive",
  },
];

const SAMPLE_USERS: Omit<UserProfile, "userId" | "createdAt">[] = [
  { name: "Alice Nakamura", email: "alice@acme.io", role: "admin" as const },
  { name: "Bob Chen", email: "bob@acme.io", role: "manager" as const },
  { name: "Carol Williams", email: "carol@acme.io", role: "customer" as const },
  { name: "Dan Okafor", email: "dan@acme.io", role: "customer" as const },
] as UserProfile[];

export default function AdminPage() {
  const { data: invoices = [] } = useAllInvoices();
  const { data: transactions = [] } = useAllTransactions();
  const { data: users = [], isLoading: usersLoading } = useListAllUsers();

  const paidInvoices = invoices.filter((i) => i.status === InvoiceStatus.paid);
  const pendingInvoices = invoices.filter(
    (i) => i.status === InvoiceStatus.pending,
  );

  const displayUsers = users.length > 0 ? users : SAMPLE_USERS;

  return (
    <div className="space-y-6" data-ocid="admin.page">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Admin Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          System-wide metrics and controls
        </p>
      </div>

      {/* Stat cards */}
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        data-ocid="admin.stats"
      >
        {statCards.map((s, i) => (
          <Card key={s.label} data-ocid={`admin.stat_card.${i + 1}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
              <s.icon size={18} className={s.color} />
            </CardHeader>
            <CardContent>
              <p className="font-display text-2xl font-bold text-foreground">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {s.delta} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invoice summary */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card data-ocid="admin.invoices_card">
          <CardHeader>
            <CardTitle className="text-base">Invoice Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Paid</span>
              <Badge
                className="bg-primary/15 text-primary border-primary/30"
                variant="outline"
              >
                {paidInvoices.length > 0 ? paidInvoices.length : 48}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pending</span>
              <Badge
                className="bg-accent/15 text-accent border-accent/30"
                variant="outline"
              >
                {pendingInvoices.length > 0 ? pendingInvoices.length : 12}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total transactions
              </span>
              <span className="text-sm font-medium text-foreground">
                {transactions.length > 0 ? transactions.length : 234}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card data-ocid="admin.recent_activity">
          <CardHeader>
            <CardTitle className="text-base">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "API Uptime", value: "99.98%", ok: true },
              { label: "Payment Gateway", value: "Operational", ok: true },
              { label: "Email Service", value: "Degraded", ok: false },
              { label: "Storage", value: "Operational", ok: true },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
                <Badge
                  variant="outline"
                  className={
                    item.ok
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-destructive/10 text-destructive border-destructive/30"
                  }
                >
                  {item.value}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card data-ocid="admin.users_card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield size={16} className="text-primary" />
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          {usersLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-medium text-muted-foreground">
                      Name
                    </th>
                    <th className="pb-3 font-medium text-muted-foreground">
                      Email
                    </th>
                    <th className="pb-3 font-medium text-muted-foreground">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayUsers.map((user, i) => (
                    <tr
                      key={String((user as { userId?: unknown }).userId ?? i)}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                      data-ocid={`admin.user_row.${i + 1}`}
                    >
                      <td className="py-3 font-medium text-foreground">
                        {user.name}
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="py-3">
                        <Badge
                          variant="outline"
                          className={
                            user.role === "admin"
                              ? "bg-destructive/10 text-destructive border-destructive/30 capitalize"
                              : user.role === "manager"
                                ? "bg-accent/10 text-accent border-accent/30 capitalize"
                                : "bg-primary/10 text-primary border-primary/30 capitalize"
                          }
                        >
                          {user.role}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <p className="text-center text-xs text-muted-foreground pt-4 pb-1">
                  Showing sample data — real users will appear once registered.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
