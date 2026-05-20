import { U as Users, A as Activity, C as ChartColumn, T as TrendingUp, j as jsxRuntimeExports } from "./index-CYPNVi4E.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BQuBCtY3.js";
import { c as useTeamMembers, d as useMyUsage } from "./useQueries-DuUJGuT7.js";
function ManagerPage() {
  const { data: team = [] } = useTeamMembers();
  const now = /* @__PURE__ */ new Date();
  const { data: usage } = useMyUsage(now.getFullYear(), now.getMonth() + 1);
  const usagePercent = usage ? Math.min(100, Math.round(Number(usage.apiCallCount) / 1e4 * 100)) : 67;
  const stats = [
    {
      label: "Team Size",
      value: team.length > 0 ? String(team.length) : "14",
      icon: Users
    },
    {
      label: "API Calls (Mo)",
      value: usage ? String(usage.apiCallCount) : "6,712",
      icon: Activity
    },
    { label: "Usage %", value: `${usagePercent}%`, icon: ChartColumn },
    { label: "Growth", value: "+9.2%", icon: TrendingUp }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "manager.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Manager Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Team performance and usage analytics" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": `manager.stat_card.${i + 1}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { size: 18, className: "text-primary" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: s.value }) })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "manager.usage_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Monthly Usage Breakdown" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: [
        { label: "API Calls", used: usagePercent, color: "bg-primary" },
        { label: "Storage", used: 42, color: "bg-accent" },
        { label: "Bandwidth", used: 78, color: "bg-chart-1" }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
            item.used,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-full rounded-full transition-all ${item.color}`,
            style: { width: `${item.used}%` }
          }
        ) })
      ] }, item.label)) })
    ] })
  ] });
}
export {
  ManagerPage as default
};
