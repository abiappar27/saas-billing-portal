import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMyUsage, useTeamMembers } from "@/hooks/useQueries";
import { Activity, BarChart3, TrendingUp, Users } from "lucide-react";

export default function ManagerPage() {
  const { data: team = [] } = useTeamMembers();
  const now = new Date();
  const { data: usage } = useMyUsage(now.getFullYear(), now.getMonth() + 1);

  const usagePercent = usage
    ? Math.min(100, Math.round((Number(usage.apiCallCount) / 10000) * 100))
    : 67;

  const stats = [
    {
      label: "Team Size",
      value: team.length > 0 ? String(team.length) : "14",
      icon: Users,
    },
    {
      label: "API Calls (Mo)",
      value: usage ? String(usage.apiCallCount) : "6,712",
      icon: Activity,
    },
    { label: "Usage %", value: `${usagePercent}%`, icon: BarChart3 },
    { label: "Growth", value: "+9.2%", icon: TrendingUp },
  ];

  return (
    <div className="space-y-6" data-ocid="manager.page">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Manager Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Team performance and usage analytics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <Card key={s.label} data-ocid={`manager.stat_card.${i + 1}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
              <s.icon size={18} className="text-primary" />
            </CardHeader>
            <CardContent>
              <p className="font-display text-2xl font-bold text-foreground">
                {s.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card data-ocid="manager.usage_card">
        <CardHeader>
          <CardTitle className="text-base">Monthly Usage Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "API Calls", used: usagePercent, color: "bg-primary" },
            { label: "Storage", used: 42, color: "bg-accent" },
            { label: "Bandwidth", used: 78, color: "bg-chart-1" },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {item.used}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${item.color}`}
                  style={{ width: `${item.used}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
