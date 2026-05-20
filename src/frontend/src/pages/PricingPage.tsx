import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Zap } from "lucide-react";
import { useState } from "react";

type Period = "monthly" | "annual";

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for individuals and small experiments.",
    features: [
      "Up to 1 user",
      "1,000 API calls/mo",
      "1 GB storage",
      "Community support",
    ],
    cta: "Get started free",
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "For growing teams that need more power.",
    features: [
      "Up to 25 users",
      "100,000 API calls/mo",
      "50 GB storage",
      "Priority support",
      "Advanced analytics",
    ],
    cta: "Start Pro trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    annualPrice: 159,
    description: "Full control for large-scale operations.",
    features: [
      "Unlimited users",
      "Unlimited API calls",
      "1 TB storage",
      "Dedicated support",
      "SSO & SAML",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <div className="space-y-8" data-ocid="pricing.page">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Simple, transparent pricing
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Choose the plan that fits your team. Upgrade or downgrade anytime.
        </p>
      </div>

      {/* Period toggle */}
      <div
        className="flex items-center justify-center gap-3"
        data-ocid="pricing.period_toggle"
      >
        <Label
          htmlFor="period-switch"
          className="text-sm text-muted-foreground"
        >
          Monthly
        </Label>
        <Switch
          id="period-switch"
          checked={period === "annual"}
          onCheckedChange={(v) => setPeriod(v ? "annual" : "monthly")}
          data-ocid="pricing.billing_period_switch"
        />
        <Label
          htmlFor="period-switch"
          className="text-sm text-muted-foreground"
        >
          Annual
          <Badge
            className="ml-2 bg-primary/15 text-primary border-primary/30 text-[10px]"
            variant="outline"
          >
            Save 20%
          </Badge>
        </Label>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan, i) => (
          <Card
            key={plan.name}
            data-ocid={`pricing.plan_card.${i + 1}`}
            className={
              plan.highlighted ? "border-primary ring-1 ring-primary" : ""
            }
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  {plan.name}
                </CardTitle>
                {plan.highlighted && (
                  <Badge
                    className="bg-primary/15 text-primary border-primary/30"
                    variant="outline"
                  >
                    Popular
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-2">
                <span className="font-display text-3xl font-bold text-foreground">
                  ${period === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                </span>
                <span className="text-sm text-muted-foreground">/mo</span>
                {period === "annual" && plan.annualPrice > 0 && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Billed ${plan.annualPrice * 12}/year
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check size={14} className="text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                data-ocid={`pricing.select_plan_button.${i + 1}`}
              >
                <Zap size={14} className="mr-1.5" />
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
