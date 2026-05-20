import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { ChevronDown, LogOut, Menu, Moon, Sun } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

const roleBadgeClass: Record<string, string> = {
  admin: "bg-destructive/15 text-destructive border-destructive/30",
  manager: "bg-accent/15 text-accent border-accent/30",
  customer: "bg-primary/15 text-primary border-primary/30",
};

export default function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { profile, role } = useCurrentUser();

  const roleKey =
    role === UserRole.admin
      ? "admin"
      : role === UserRole.manager
        ? "manager"
        : "customer";
  const roleLabel = roleKey.charAt(0).toUpperCase() + roleKey.slice(1);
  const initials = profile?.name?.[0]?.toUpperCase() ?? "U";
  const displayName = profile?.name ?? "User";

  return (
    <header
      data-ocid="header.bar"
      className="flex h-14 shrink-0 items-center justify-between bg-card border-b border-border px-4 shadow-sm"
    >
      {/* Left: mobile menu + brand */}
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          data-ocid="header.menu_button"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </Button>
        <span className="font-display text-base font-semibold text-foreground hidden sm:inline">
          SaaS Billing Portal
        </span>
      </div>

      {/* Right: theme toggle + user dropdown */}
      <div className="flex items-center gap-2">
        {/* Dark/light toggle */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          data-ocid="header.theme_toggle"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="flex items-center gap-2 px-2"
              data-ocid="header.user_menu_trigger"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
                {initials}
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">
                {displayName}
              </span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52"
            data-ocid="header.user_dropdown"
          >
            <DropdownMenuLabel className="pb-1">
              <p className="text-sm font-medium text-foreground truncate">
                {displayName}
              </p>
              <Badge
                variant="outline"
                className={cn(
                  "mt-1 text-[10px] px-1.5 py-0",
                  roleBadgeClass[roleKey],
                )}
              >
                {roleLabel}
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              data-ocid="header.logout_button"
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut size={14} className="mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
