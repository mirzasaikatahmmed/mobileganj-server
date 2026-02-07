"use client";

import { InvoiceSettings } from "@/types/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Receipt, FileText, Settings2 } from "lucide-react";

interface Props {
  data: InvoiceSettings;
  onChange: (data: InvoiceSettings) => void;
}

export default function InvoiceTab({ data, onChange }: Props) {
  const update = <K extends keyof InvoiceSettings>(
    field: K,
    value: InvoiceSettings[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* Invoice Format */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Receipt className="w-5 h-5 text-primary" />
          Invoice Format
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Invoice Prefix</Label>
            <Input
              value={data.invoicePrefix}
              onChange={(e) => update("invoicePrefix", e.target.value)}
              placeholder="MG"
            />
            <p className="text-xs text-muted-foreground">
              Preview: {data.invoicePrefix}-{data.nextInvoiceNumber}
            </p>
          </div>
          <div className="space-y-2">
            <Label>Next Invoice Number</Label>
            <Input
              type="number"
              value={data.nextInvoiceNumber}
              onChange={(e) =>
                update("nextInvoiceNumber", parseInt(e.target.value) || 0)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Paper Size</Label>
            <Select
              value={data.paperSize}
              onValueChange={(v) =>
                update("paperSize", v as InvoiceSettings["paperSize"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A4">A4</SelectItem>
                <SelectItem value="A5">A5</SelectItem>
                <SelectItem value="Thermal-80mm">Thermal 80mm</SelectItem>
                <SelectItem value="Thermal-58mm">Thermal 58mm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Currency</Label>
            <Input
              value={data.currency}
              onChange={(e) => update("currency", e.target.value)}
              placeholder="BDT"
            />
          </div>
          <div className="space-y-2">
            <Label>Currency Symbol</Label>
            <Input
              value={data.currencySymbol}
              onChange={(e) => update("currencySymbol", e.target.value)}
              placeholder="৳"
            />
          </div>
        </div>
      </div>

      {/* Toggle Options */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Settings2 className="w-5 h-5 text-primary" />
          Display Options
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: "showLogo" as const, label: "Show Logo on Invoice" },
            { key: "showStoreAddress" as const, label: "Show Store Address" },
            {
              key: "showCustomerAddress" as const,
              label: "Show Customer Address",
            },
            { key: "showIMEI" as const, label: "Show IMEI Number" },
            { key: "showWarranty" as const, label: "Show Warranty Info" },
          ].map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <Label className="cursor-pointer">{label}</Label>
              <Switch
                checked={data[key]}
                onCheckedChange={(v) => update(key, v)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Messages */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <FileText className="w-5 h-5 text-primary" />
          Footer Messages
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Footer Note (English)</Label>
            <Textarea
              value={data.footerNote}
              onChange={(e) => update("footerNote", e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>Footer Note (বাংলা)</Label>
            <Textarea
              value={data.footerNoteBn}
              onChange={(e) => update("footerNoteBn", e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>Thank You Message (English)</Label>
            <Input
              value={data.thankYouMessage}
              onChange={(e) => update("thankYouMessage", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Thank You Message (বাংলা)</Label>
            <Input
              value={data.thankYouMessageBn}
              onChange={(e) => update("thankYouMessageBn", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Terms & Conditions</Label>
            <Textarea
              value={data.termsAndConditions}
              onChange={(e) => update("termsAndConditions", e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
