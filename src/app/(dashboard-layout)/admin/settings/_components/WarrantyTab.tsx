"use client";

import { WarrantySettings } from "@/types/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck } from "lucide-react";

interface Props {
  data: WarrantySettings;
  onChange: (data: WarrantySettings) => void;
}

export default function WarrantyTab({ data, onChange }: Props) {
  const update = <K extends keyof WarrantySettings>(
    field: K,
    value: WarrantySettings[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <ShieldCheck className="w-5 h-5 text-primary" />
          Warranty Configuration
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Phone Warranty (days)</Label>
            <Input
              type="number"
              value={data.defaultPhoneWarrantyDays}
              onChange={(e) =>
                update(
                  "defaultPhoneWarrantyDays",
                  parseInt(e.target.value) || 0,
                )
              }
            />
            <p className="text-xs text-muted-foreground">
              {Math.round(data.defaultPhoneWarrantyDays / 30)} months
            </p>
          </div>
          <div className="space-y-2">
            <Label>Accessory Warranty (days)</Label>
            <Input
              type="number"
              value={data.defaultAccessoryWarrantyDays}
              onChange={(e) =>
                update(
                  "defaultAccessoryWarrantyDays",
                  parseInt(e.target.value) || 0,
                )
              }
            />
            <p className="text-xs text-muted-foreground">
              {Math.round(data.defaultAccessoryWarrantyDays / 30)} months
            </p>
          </div>
          <div className="space-y-2">
            <Label>Warranty Card Prefix</Label>
            <Input
              value={data.warrantyCardPrefix}
              onChange={(e) => update("warrantyCardPrefix", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="cursor-pointer">Show Warranty on Invoice</Label>
              <p className="text-xs text-muted-foreground">
                Display warranty info in the invoice
              </p>
            </div>
            <Switch
              checked={data.showWarrantyOnInvoice}
              onCheckedChange={(v) => update("showWarrantyOnInvoice", v)}
            />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="cursor-pointer">Enable Warranty Tracking</Label>
              <p className="text-xs text-muted-foreground">
                Track warranty claims & status
              </p>
            </div>
            <Switch
              checked={data.enableWarrantyTracking}
              onCheckedChange={(v) => update("enableWarrantyTracking", v)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Warranty Terms (English)</Label>
            <Textarea
              value={data.warrantyTerms}
              onChange={(e) => update("warrantyTerms", e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label>Warranty Terms (বাংলা)</Label>
            <Textarea
              value={data.warrantyTermsBn}
              onChange={(e) => update("warrantyTermsBn", e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
