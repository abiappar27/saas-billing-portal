import { UserRole } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  Receipt,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect } from "react";

const statCards = [
  {
    label: "Total Revenue",
    value: "$12,480",
    delta: "+18.2%",
    icon: DollarSign,
    color: "text-primary",
  },
  {
    label: "Active Subscriptions",
    value: "248",
    delta: "+12 this month",
    icon: CreditCard,
    color: "text-accent",
  },
  {
    label: "API Calls (Today)",
    value: "84,302",
    delta: "+5.4%",
    icon: Activity,
    color: "text-primary",
  },
  {
    label: "MRR Growth",
    value: "+22.1%",
    delta: "vs last quarter",
    icon: TrendingUp,
    color: "text-accent",
  },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { profile, role, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6" data-ocid="home.page">
      {/* Welcome header */}
      <div className="flex items-center justify-between">
        <div>
          {isLoading ? (
            <Skeleton className="h-8 w-48 mb-2" />
          ) : (
            <h1 className="font-display text-2xl font-semibold text-foreground">
              Welcome back{profile?.name ? `, ${profile.name}` : ""}
            </h1>
          )}
          <p className="font-body text-muted-foreground text-sm mt-1">
            {role === UserRole.admin &&
              "System overview — all accounts visible"}
            {role === UserRole.manager && "Team dashboard — usage and members"}
            {role === UserRole.customer &&
              "Your billing portal — subscriptions and invoices"}
          </p>
        </div>
        <Badge
          variant="secondary"
          className="capitalize font-body px-3 py-1"
          data-ocid="home.role_badge"
        >
          {role}
        </Badge>
      </div>

      {/* Stat cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        data-ocid="home.stats_section"
      >
        {statCards.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-primary/40 transition-smooth"
            data-ocid={`home.stat.${i + 1}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-muted-foreground">
                {stat.label}
              </span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">
                {stat.value}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3 text-primary" />
                {stat.delta}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions by role */}
      <div
        className="bg-card border border-border rounded-xl p-6"
        data-ocid="home.quick_actions"
      >
        <h2 className="font-display text-base font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {role === UserRole.admin && (
            <>
              <QuickAction
                icon={Users}
                label="Manage Users"
                ocid="home.manage_users_button"
                onClick={() => navigate({ to: "/admin" })}
              />
              <QuickAction
                icon={Receipt}
                label="All Invoices"
                ocid="home.all_invoices_button"
                onClick={() => navigate({ to: "/billing" })}
              />
              <QuickAction
                icon={BarChart3}
                label="Analytics"
                ocid="home.analytics_button"
                onClick={() => navigate({ to: "/admin" })}
              />
              <QuickAction
                icon={Settings}
                label="Settings"
                ocid="home.settings_button"
                onClick={() => navigate({ to: "/account" })}
              />
            </>
          )}
          {role === UserRole.manager && (
            <>
              <QuickAction
                icon={Users}
                label="Team Members"
                ocid="home.team_button"
                onClick={() => navigate({ to: "/team" })}
              />
              <QuickAction
                icon={BarChart3}
                label="Usage Analytics"
                ocid="home.usage_button"
                onClick={() => navigate({ to: "/manager" })}
              />
              <QuickAction
                icon={Receipt}
                label="Billing History"
                ocid="home.billing_button"
                onClick={() => navigate({ to: "/billing" })}
              />
              <QuickAction
                icon={Settings}
                label="Settings"
                ocid="home.settings_button"
                onClick={() => navigate({ to: "/account" })}
              />
            </>
          )}
          {role === UserRole.customer && (
            <>
              <QuickAction
                icon={CreditCard}
                label="My Subscription"
                ocid="home.subscription_button"
                onClick={() => navigate({ to: "/billing" })}
              />
              <QuickAction
                icon={Receipt}
                label="Invoices"
                ocid="home.invoices_button"
                onClick={() => navigate({ to: "/billing" })}
              />
              <QuickAction
                icon={LayoutDashboard}
                label="Dashboard"
                ocid="home.dashboard_button"
                onClick={() => navigate({ to: "/" })}
              />
              <QuickAction
                icon={Settings}
                label="Settings"
                ocid="home.settings_button"
                onClick={() => navigate({ to: "/account" })}
              />
            </>
          )}
        </div>
      </div>

      {/* Hero image section */}
      <div
        className="rounded-xl overflow-hidden border border-border relative"
        data-ocid="home.hero_section"
      >
        <img
          src="/assets/generated/billing-hero.dim_1200x600.jpg"
          alt="Billing analytics dashboard"
          className="w-full h-48 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent flex items-center">
          <div className="p-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              Enterprise-grade billing infrastructure
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-4 max-w-sm">
              Manage subscriptions, invoices, and payments for your entire
              organization from one place.
            </p>
            <Button size="sm" data-ocid="home.learn_more_button">
              Explore features
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  ocid,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  ocid: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-2 p-4 bg-muted/40 hover:bg-muted rounded-xl border border-border hover:border-primary/30 transition-smooth cursor-pointer"
      data-ocid={ocid}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 text-primary" />
      <span className="font-body text-xs text-foreground text-center">
        {label}
      </span>
    </button>
  );
}
