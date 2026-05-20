import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useMyInvoices,
  useMySubscription,
  useMyTransactions,
} from "@/hooks/useQueries";
import { InvoiceStatus } from "@/types";
import { CreditCard, Download, Receipt } from "lucide-react";

function handleDownload(invoiceId: string) {
  const link = document.createElement("a");
  link.href = `data:text/plain,Invoice ${invoiceId}`;
  link.download = `invoice-${invoiceId}.txt`;
  link.click();
}

export default function BillingPage() {
  const { data: invoices = [], isLoading: invLoading } = useMyInvoices();
  useMyTransactions();
  const { data: subscription } = useMySubscription();

  const displayInvoices =
    invoices.length > 0
      ? invoices
      : [
          {
            id: "INV-001",
            amountCents: BigInt(9900),
            status: InvoiceStatus.paid,
            createdAt: BigInt(Date.now() - 86400000),
            userId: "" as unknown as import("@/backend").UserId,
            description: "Pro plan",
            currency: "usd",
          },
          {
            id: "INV-002",
            amountCents: BigInt(9900),
            status: InvoiceStatus.paid,
            createdAt: BigInt(Date.now() - 5184000000),
            userId: "" as unknown as import("@/backend").UserId,
            description: "Pro plan",
            currency: "usd",
          },
          {
            id: "INV-003",
            amountCents: BigInt(9900),
            status: InvoiceStatus.pending,
            createdAt: BigInt(Date.now() - 10368000000),
            userId: "" as unknown as import("@/backend").UserId,
            description: "Pro plan",
            currency: "usd",
          },
        ];

  return (
    <div className="space-y-6" data-ocid="billing.page">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Billing & Invoices
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your subscription and download invoices
        </p>
      </div>

      {/* Current plan */}
      <Card data-ocid="billing.plan_card">
        <CardHeader className="flex flex-row items-center gap-3">
          <CreditCard size={20} className="text-primary" />
          <CardTitle className="text-base">Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {subscription ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Badge
                className="bg-primary/15 text-primary border-primary/30 text-sm px-3 py-1"
                variant="outline"
              >
                {String(subscription.tier)}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Renews{" "}
                {subscription.nextBillingDate
                  ? new Date(
                      Number(subscription.nextBillingDate) / 1_000_000,
                    ).toLocaleDateString()
                  : "—"}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Badge
                className="bg-primary/15 text-primary border-primary/30 text-sm px-3 py-1"
                variant="outline"
              >
                Pro
              </Badge>
              <span className="text-sm text-muted-foreground">
                Renews Jan 1, 2027
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card data-ocid="billing.invoices_card">
        <CardHeader className="flex flex-row items-center gap-3">
          <Receipt size={20} className="text-primary" />
          <CardTitle className="text-base">Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          {invLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="h-10 w-full" />
              ))}
            </div>
          ) : displayInvoices.length === 0 ? (
            <p
              className="text-sm text-muted-foreground py-4 text-center"
              data-ocid="billing.invoices_empty_state"
            >
              No invoices yet.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {displayInvoices.map((inv, idx) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between py-3"
                  data-ocid={`billing.invoice_row.${idx + 1}`}
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {inv.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        Number(inv.createdAt) / 1_000_000,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={
                        inv.status === InvoiceStatus.paid
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-accent/10 text-accent border-accent/30"
                      }
                    >
                      {String(inv.status)}
                    </Badge>
                    <span className="text-sm font-medium text-foreground">
                      ${(Number(inv.amountCents) / 100).toFixed(2)}
                    </span>
                    {inv.status === InvoiceStatus.paid && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(inv.id)}
                        data-ocid={`billing.download_button.${idx + 1}`}
                        aria-label="Download invoice"
                      >
                        <Download size={15} />
                      </Button>
                    )}
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
