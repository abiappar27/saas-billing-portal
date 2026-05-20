import { c as createLucideIcon, I as InvoiceStatus, j as jsxRuntimeExports, D as DollarSign, U as Users, T as TrendingUp, B as Badge, S as Skeleton } from "./index-CYPNVi4E.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BQuBCtY3.js";
import { u as useAllInvoices, a as useAllTransactions, b as useListAllUsers } from "./useQueries-DuUJGuT7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const statCards = [
  {
    label: "Total Revenue",
    value: "$128,450",
    delta: "+12.4%",
    icon: DollarSign,
    color: "text-primary"
  },
  {
    label: "Active Users",
    value: "2,340",
    delta: "+8.1%",
    icon: Users,
    color: "text-accent"
  },
  {
    label: "Subscriptions",
    value: "1,893",
    delta: "+5.6%",
    icon: TrendingUp,
    color: "text-primary"
  },
  {
    label: "Open Issues",
    value: "7",
    delta: "-2",
    icon: CircleAlert,
    color: "text-destructive"
  }
];
const SAMPLE_USERS = [
  { name: "Alice Nakamura", email: "alice@acme.io", role: "admin" },
  { name: "Bob Chen", email: "bob@acme.io", role: "manager" },
  { name: "Carol Williams", email: "carol@acme.io", role: "customer" },
  { name: "Dan Okafor", email: "dan@acme.io", role: "customer" }
];
function AdminPage() {
  const { data: invoices = [] } = useAllInvoices();
  const { data: transactions = [] } = useAllTransactions();
  const { data: users = [], isLoading: usersLoading } = useListAllUsers();
  const paidInvoices = invoices.filter((i) => i.status === InvoiceStatus.paid);
  const pendingInvoices = invoices.filter(
    (i) => i.status === InvoiceStatus.pending
  );
  const displayUsers = users.length > 0 ? users : SAMPLE_USERS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Admin Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "System-wide metrics and controls" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
        "data-ocid": "admin.stats",
        children: statCards.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": `admin.stat_card.${i + 1}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: s.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { size: 18, className: s.color })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: s.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              s.delta,
              " from last month"
            ] })
          ] })
        ] }, s.label))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "admin.invoices_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Invoice Status" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Paid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "bg-primary/15 text-primary border-primary/30",
                variant: "outline",
                children: paidInvoices.length > 0 ? paidInvoices.length : 48
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "bg-accent/15 text-accent border-accent/30",
                variant: "outline",
                children: pendingInvoices.length > 0 ? pendingInvoices.length : 12
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Total transactions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: transactions.length > 0 ? transactions.length : 234 })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "admin.recent_activity", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "System Health" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: [
          { label: "API Uptime", value: "99.98%", ok: true },
          { label: "Payment Gateway", value: "Operational", ok: true },
          { label: "Email Service", value: "Degraded", ok: false },
          { label: "Storage", value: "Operational", ok: true }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: item.ok ? "bg-primary/10 text-primary border-primary/30" : "bg-destructive/10 text-destructive border-destructive/30",
                  children: item.value
                }
              )
            ]
          },
          item.label
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "admin.users_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16, className: "text-primary" }),
        "All Users"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: usersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, n)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-medium text-muted-foreground", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-medium text-muted-foreground", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-medium text-muted-foreground", children: "Role" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: displayUsers.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border/50 hover:bg-muted/30 transition-colors",
              "data-ocid": `admin.user_row.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 font-medium text-foreground", children: user.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-muted-foreground", children: user.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: user.role === "admin" ? "bg-destructive/10 text-destructive border-destructive/30 capitalize" : user.role === "manager" ? "bg-accent/10 text-accent border-accent/30 capitalize" : "bg-primary/10 text-primary border-primary/30 capitalize",
                    children: user.role
                  }
                ) })
              ]
            },
            String(user.userId ?? i)
          )) })
        ] }),
        users.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground pt-4 pb-1", children: "Showing sample data — real users will appear once registered." })
      ] }) })
    ] })
  ] });
}
export {
  AdminPage as default
};
