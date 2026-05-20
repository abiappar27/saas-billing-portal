import { c as createLucideIcon, I as InvoiceStatus, j as jsxRuntimeExports, a as CreditCard, B as Badge, R as Receipt, S as Skeleton, b as Button } from "./index-CYPNVi4E.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BQuBCtY3.js";
import { e as useMyInvoices, f as useMyTransactions, g as useMySubscription } from "./useQueries-DuUJGuT7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
function handleDownload(invoiceId) {
  const link = document.createElement("a");
  link.href = `data:text/plain,Invoice ${invoiceId}`;
  link.download = `invoice-${invoiceId}.txt`;
  link.click();
}
function BillingPage() {
  const { data: invoices = [], isLoading: invLoading } = useMyInvoices();
  useMyTransactions();
  const { data: subscription } = useMySubscription();
  const displayInvoices = invoices.length > 0 ? invoices : [
    {
      id: "INV-001",
      amountCents: BigInt(9900),
      status: InvoiceStatus.paid,
      createdAt: BigInt(Date.now() - 864e5),
      userId: "",
      description: "Pro plan",
      currency: "usd"
    },
    {
      id: "INV-002",
      amountCents: BigInt(9900),
      status: InvoiceStatus.paid,
      createdAt: BigInt(Date.now() - 5184e6),
      userId: "",
      description: "Pro plan",
      currency: "usd"
    },
    {
      id: "INV-003",
      amountCents: BigInt(9900),
      status: InvoiceStatus.pending,
      createdAt: BigInt(Date.now() - 10368e6),
      userId: "",
      description: "Pro plan",
      currency: "usd"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "billing.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Billing & Invoices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage your subscription and download invoices" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "billing.plan_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 20, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Current Plan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: subscription ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: "bg-primary/15 text-primary border-primary/30 text-sm px-3 py-1",
            variant: "outline",
            children: String(subscription.tier)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "Renews",
          " ",
          subscription.nextBillingDate ? new Date(
            Number(subscription.nextBillingDate) / 1e6
          ).toLocaleDateString() : "—"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: "bg-primary/15 text-primary border-primary/30 text-sm px-3 py-1",
            variant: "outline",
            children: "Pro"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Renews Jan 1, 2027" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "billing.invoices_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 20, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Invoices" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: invLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, n)) }) : displayInvoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm text-muted-foreground py-4 text-center",
          "data-ocid": "billing.invoices_empty_state",
          children: "No invoices yet."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: displayInvoices.map((inv, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between py-3",
          "data-ocid": `billing.invoice_row.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: inv.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(
                Number(inv.createdAt) / 1e6
              ).toLocaleDateString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: inv.status === InvoiceStatus.paid ? "bg-primary/10 text-primary border-primary/30" : "bg-accent/10 text-accent border-accent/30",
                  children: String(inv.status)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
                "$",
                (Number(inv.amountCents) / 100).toFixed(2)
              ] }),
              inv.status === InvoiceStatus.paid && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  onClick: () => handleDownload(inv.id),
                  "data-ocid": `billing.download_button.${idx + 1}`,
                  "aria-label": "Download invoice",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 15 })
                }
              )
            ] })
          ]
        },
        inv.id
      )) }) })
    ] })
  ] });
}
export {
  BillingPage as default
};
