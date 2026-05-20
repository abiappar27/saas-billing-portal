import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Receipt,
  ShieldCheck,
  Tag,
  UserCircle,
  Users,
} from "lucide-react";

interface SidebarProps {
  onNavigate?: () => void;
}

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const adminNav: NavItem[] = [
  { label: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
  { label: "Users", path: "/admin", icon: <Users size={18} /> },
  {
    label: "Billing Overview",
    path: "/billing",
    icon: <CreditCard size={18} />,
  },
  { label: "Analytics", path: "/manager", icon: <BarChart3 size={18} /> },
  { label: "Team", path: "/team", icon: <ShieldCheck size={18} /> },
];

const managerNav: NavItem[] = [
  { label: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
  { label: "Team", path: "/team", icon: <Users size={18} /> },
  { label: "Usage", path: "/manager", icon: <Activity size={18} /> },
  { label: "Analytics", path: "/billing", icon: <BarChart3 size={18} /> },
];

const customerNav: NavItem[] = [
  { label: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
  { label: "My Plan", path: "/pricing", icon: <Tag size={18} /> },
  { label: "Invoices", path: "/billing", icon: <Receipt size={18} /> },
  { label: "Account", path: "/account", icon: <UserCircle size={18} /> },
];

const roleLabel: Record<string, string> = {
  admin: "Admin",
  manager: "Manager",
  customer: "Customer",
};

const roleBadgeClass: Record<string, string> = {
  admin: "bg-destructive/15 text-destructive border-destructive/30",
  manager: "bg-accent/15 text-accent border-accent/30",
  customer: "bg-primary/15 text-primary border-primary/30",
};

export default function Sidebar({ onNavigate }: SidebarProps) {
  const { profile, role } = useCurrentUser();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navItems =
    role === UserRole.admin
      ? adminNav
      : role === UserRole.manager
        ? managerNav
        : customerNav;

  const roleKey =
    role === UserRole.admin
      ? "admin"
      : role === UserRole.manager
        ? "manager"
        : "customer";

  return (
    <div className="flex flex-col h-full" data-ocid="sidebar.panel">
      {/* Logo / Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <ShieldCheck size={16} className="text-primary-foreground" />
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-foreground leading-none">
            SaaS Billing
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Portal</p>
        </div>
      </div>

      {/* Nav links */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
        data-ocid="sidebar.nav"
      >
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? currentPath === "/"
              : currentPath.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              data-ocid={`sidebar.link.${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span
                className={isActive ? "text-primary" : "text-muted-foreground"}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info footer */}
      {profile && (
        <div
          className="border-t border-border px-4 py-4"
          data-ocid="sidebar.user_info"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">
              {profile.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {profile.name ?? "User"}
              </p>
              <Badge
                variant="outline"
                className={cn(
                  "mt-0.5 text-[10px] px-1.5 py-0",
                  roleBadgeClass[roleKey],
                )}
              >
                {roleLabel[roleKey]}
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
