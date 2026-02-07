"use client";

import { OverseasSettings } from "@/types/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, DollarSign, Percent, Plus, X } from "lucide-react";
import { useState } from "react";

interface Props {
  data: OverseasSettings;
  onChange: (data: OverseasSettings) => void;
}

export default function OverseasTab({ data, onChange }: Props) {
  const [newProvider, setNewProvider] = useState("");

  const update = <K extends keyof OverseasSettings>(
    field: K,
    value: OverseasSettings[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  const addProvider = () => {
    if (
      newProvider.trim() &&
      !data.trackingProviders.includes(newProvider.trim())
    ) {
      update("trackingProviders", [
        ...data.trackingProviders,
        newProvider.trim(),
      ]);
      setNewProvider("");
    }
  };

  const removeProvider = (p: string) => {
    update(
      "trackingProviders",
      data.trackingProviders.filter((t) => t !== p),
    );
  };

  return (
    <div className="space-y-8">
      {/* Enable */}
      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
        <div className="flex items-center gap-3">
          <Plane className="w-6 h-6 text-primary" />
          <div>
            <p className="font-semibold">Overseas / Import Tracking</p>
            <p className="text-sm text-muted-foreground">
              Track overseas phone imports & currency conversion
            </p>
          </div>
        </div>
        <Switch
          checked={data.enableOverseasTracking}
          onCheckedChange={(v) => update("enableOverseasTracking", v)}
        />
      </div>

      {data.enableOverseasTracking && (
        <>
          {/* Currency Rates */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <DollarSign className="w-5 h-5 text-primary" />
              Currency Conversion Rates (to BDT)
            </div>
            <div className="space-y-2 mb-4">
              <Label>Default Currency</Label>
              <Select
                value={data.defaultCurrency}
                onValueChange={(v) =>
                  update(
                    "defaultCurrency",
                    v as OverseasSettings["defaultCurrency"],
                  )
                }
              >
                <SelectTrigger className="max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  key: "conversionRateUSD" as const,
                  label: "🇺🇸 1 USD = ৳",
                  currency: "USD",
                },
                {
                  key: "conversionRateJPY" as const,
                  label: "🇯🇵 1 JPY = ৳",
                  currency: "JPY",
                },
                {
                  key: "conversionRateAUD" as const,
                  label: "🇦🇺 1 AUD = ৳",
                  currency: "AUD",
                },
                {
                  key: "conversionRateGBP" as const,
                  label: "🇬🇧 1 GBP = ৳",
                  currency: "GBP",
                },
                {
                  key: "conversionRateEUR" as const,
                  label: "🇪🇺 1 EUR = ৳",
                  currency: "EUR",
                },
              ].map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <Label>{label}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={data[key]}
                    onChange={(e) =>
                      update(key, parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Taxes & Duties */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Percent className="w-5 h-5 text-primary" />
              Taxes & Duties
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Import Duty (%)</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={data.importDutyPercent}
                  onChange={(e) =>
                    update("importDutyPercent", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>VAT (%)</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={data.vatPercent}
                  onChange={(e) =>
                    update("vatPercent", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Default Shipping Method</Label>
                <Input
                  value={data.defaultShippingMethod}
                  onChange={(e) =>
                    update("defaultShippingMethod", e.target.value)
                  }
                  placeholder="Air Cargo"
                />
              </div>
            </div>
          </div>

          {/* Tracking Providers */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Plane className="w-5 h-5 text-primary" />
              Tracking Providers
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {data.trackingProviders.map((p) => (
                <Badge
                  key={p}
                  variant="secondary"
                  className="gap-1 px-3 py-1.5"
                >
                  {p}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeProvider(p)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 max-w-sm">
              <Input
                placeholder="e.g. EMS, Japan Post"
                value={newProvider}
                onChange={(e) => setNewProvider(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addProvider()}
              />
              <Button variant="outline" size="sm" onClick={addProvider}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
