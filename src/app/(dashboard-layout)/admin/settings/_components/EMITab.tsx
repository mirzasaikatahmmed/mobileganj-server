"use client";

import { EMISettings } from "@/types/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, X, AlertCircle, FileText } from "lucide-react";
import { useState } from "react";

interface Props {
  data: EMISettings;
  onChange: (data: EMISettings) => void;
}

export default function EMITab({ data, onChange }: Props) {
  const [newDuration, setNewDuration] = useState("");
  const [newDoc, setNewDoc] = useState("");

  const update = <K extends keyof EMISettings>(
    field: K,
    value: EMISettings[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  const addDuration = () => {
    const dur = parseInt(newDuration);
    if (dur && !data.availableDurations.includes(dur)) {
      update(
        "availableDurations",
        [...data.availableDurations, dur].sort((a, b) => a - b),
      );
      setNewDuration("");
    }
  };

  const removeDuration = (dur: number) => {
    update(
      "availableDurations",
      data.availableDurations.filter((d) => d !== dur),
    );
  };

  const addDoc = () => {
    if (newDoc.trim() && !data.requiredDocuments.includes(newDoc.trim())) {
      update("requiredDocuments", [...data.requiredDocuments, newDoc.trim()]);
      setNewDoc("");
    }
  };

  const removeDoc = (doc: string) => {
    update(
      "requiredDocuments",
      data.requiredDocuments.filter((d) => d !== doc),
    );
  };

  return (
    <div className="space-y-8">
      {/* EMI Toggle */}
      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
        <div className="flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-primary" />
          <div>
            <p className="font-semibold">Enable EMI / Installment</p>
            <p className="text-sm text-muted-foreground">
              Allow customers to pay in installments
            </p>
          </div>
        </div>
        <Switch
          checked={data.enableEMI}
          onCheckedChange={(v) => update("enableEMI", v)}
        />
      </div>

      {data.enableEMI && (
        <>
          {/* Basic EMI Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <CreditCard className="w-5 h-5 text-primary" />
              EMI Configuration
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Min EMI Amount (৳)</Label>
                <Input
                  type="number"
                  value={data.minEMIAmount}
                  onChange={(e) =>
                    update("minEMIAmount", parseInt(e.target.value) || 0)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Down Payment (%)</Label>
                <Input
                  type="number"
                  value={data.defaultDownPaymentPercent}
                  onChange={(e) =>
                    update(
                      "defaultDownPaymentPercent",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Interest Rate (%)</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={data.interestRate}
                  onChange={(e) =>
                    update("interestRate", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Grace Period (days)</Label>
                <Input
                  type="number"
                  value={data.gracePeriodDays}
                  onChange={(e) =>
                    update("gracePeriodDays", parseInt(e.target.value) || 0)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Late Fee Per Day (৳)</Label>
              <Input
                type="number"
                value={data.lateFeePerDay}
                onChange={(e) =>
                  update("lateFeePerDay", parseInt(e.target.value) || 0)
                }
                className="max-w-xs"
              />
            </div>
          </div>

          {/* Durations */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <AlertCircle className="w-5 h-5 text-primary" />
              Available Durations
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {data.availableDurations.map((dur) => (
                <Badge
                  key={dur}
                  variant="secondary"
                  className="text-sm px-3 py-1.5 gap-1"
                >
                  {dur} months
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeDuration(dur)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 max-w-xs">
              <Input
                placeholder="e.g. 18"
                type="number"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addDuration()}
              />
              <Button variant="outline" size="sm" onClick={addDuration}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Required Documents */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FileText className="w-5 h-5 text-primary" />
              Required Documents
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {data.requiredDocuments.map((doc) => (
                <Badge
                  key={doc}
                  variant="outline"
                  className="text-sm px-3 py-1.5 gap-1"
                >
                  {doc}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeDoc(doc)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 max-w-sm">
              <Input
                placeholder="e.g. Trade License"
                value={newDoc}
                onChange={(e) => setNewDoc(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addDoc()}
              />
              <Button variant="outline" size="sm" onClick={addDoc}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
