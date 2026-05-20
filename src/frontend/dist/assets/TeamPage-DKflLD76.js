import { c as createLucideIcon, j as jsxRuntimeExports, U as Users, S as Skeleton, p as UserRole, q as TeamMemberStatus, B as Badge } from "./index-CYPNVi4E.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BQuBCtY3.js";
import { c as useTeamMembers } from "./useQueries-DuUJGuT7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
const mockTeam = [
  {
    status: TeamMemberStatus.active,
    joinDate: BigInt(Date.now() - 31536e6),
    name: "Alice Chen",
    email: "alice@example.com",
    role: UserRole.admin,
    invitedBy: "",
    principalId: "u1"
  },
  {
    status: TeamMemberStatus.active,
    joinDate: BigInt(Date.now() - 15768e6),
    name: "Bob Patel",
    email: "bob@example.com",
    role: UserRole.manager,
    invitedBy: "",
    principalId: "u2"
  },
  {
    status: TeamMemberStatus.active,
    joinDate: BigInt(Date.now() - 7884e6),
    name: "Carol Wu",
    email: "carol@example.com",
    role: UserRole.customer,
    invitedBy: "",
    principalId: "u3"
  },
  {
    status: TeamMemberStatus.suspended,
    joinDate: BigInt(Date.now() - 2592e6),
    name: "Dan Ortiz",
    email: "dan@example.com",
    role: UserRole.customer,
    invitedBy: "",
    principalId: "u4"
  }
];
const statusIcon = (s) => s === TeamMemberStatus.active ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 14, className: "text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { size: 14, className: "text-destructive" });
const roleLabel = (r) => r === UserRole.admin ? "Admin" : r === UserRole.manager ? "Manager" : "Customer";
const roleBadgeClass = (r) => r === UserRole.admin ? "bg-destructive/10 text-destructive border-destructive/30" : r === UserRole.manager ? "bg-accent/10 text-accent border-accent/30" : "bg-primary/10 text-primary border-primary/30";
function TeamPage() {
  const { data: members = [], isLoading } = useTeamMembers();
  const display = members.length > 0 ? members : mockTeam;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "team.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Team Members" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage access and roles for your organization" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "team.members_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "All Members" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, n)) }) : display.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm text-muted-foreground py-6 text-center",
          "data-ocid": "team.empty_state",
          children: "No team members yet."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: display.map((m, idx) => {
        var _a, _b;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-3",
            "data-ocid": `team.member_row.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold shrink-0", children: ((_b = (_a = m.name) == null ? void 0 : _a[0]) == null ? void 0 : _b.toUpperCase()) ?? "U" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: m.name ?? "Unknown" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: m.email })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: roleBadgeClass(m.role), children: roleLabel(m.role) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                  statusIcon(m.status),
                  String(m.status)
                ] })
              ] })
            ]
          },
          String(m.principalId)
        );
      }) }) })
    ] })
  ] });
}
export {
  TeamPage as default
};
