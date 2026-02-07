"use client";

import { POSSettings } from "@/types/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Monitor,
  Printer,
  ScanBarcode,
  Volume2,
  ShoppingCart,
} from "lucide-react";

interface Props {
  data: POSSettings;
  onChange: (data: POSSettings) => void;
}

export default function POSTab({ data, onChange }: Props) {
  const update = <K extends keyof POSSettings>(
    field: K,
    value: POSSettings[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* Quick Sale Features */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <ShoppingCart className="w-5 h-5 text-primary" />
          POS Features
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: "enableQuickSale" as const,
              label: "Quick Sale Mode",
              desc: "Simplified sale process for walk-in customers",
              icon: ShoppingCart,
            },
            {
              key: "enableBarcodeScan" as const,
              label: "Barcode Scanner",
              desc: "Scan product barcodes to add items",
              icon: ScanBarcode,
            },
            {
              key: "enableCustomerDisplay" as const,
              label: "Customer Display",
              desc: "Show sale info on a second screen",
              icon: Monitor,
            },
            {
              key: "enableSoundEffects" as const,
              label: "Sound Effects",
              desc: "Play sounds on scan and sale",
              icon: Volume2,
            },
            {
              key: "enableHoldBill" as const,
              label: "Hold Bills",
              desc: "Hold incomplete bills for later",
              icon: ShoppingCart,
            },
          ].map(({ key, label, desc, icon: Icon }) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="cursor-pointer">{label}</Label>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
              <Switch
                checked={data[key]}
                onCheckedChange={(v) => update(key, v)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Number Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Printer className="w-5 h-5 text-primary" />
          POS Configuration
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Default Discount (%)</Label>
            <Input
              type="number"
              value={data.defaultDiscount}
              onChange={(e) =>
                update("defaultDiscount", parseInt(e.target.value) || 0)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Low Stock Alert (qty)</Label>
            <Input
              type="number"
              value={data.lowStockAlert}
              onChange={(e) =>
                update("lowStockAlert", parseInt(e.target.value) || 1)
              }
            />
            <p className="text-xs text-muted-foreground">
              Alert when stock falls below this
            </p>
          </div>
          {data.enableHoldBill && (
            <div className="space-y-2">
              <Label>Max Hold Bills</Label>
              <Input
                type="number"
                value={data.maxHoldBills}
                onChange={(e) =>
                  update("maxHoldBills", parseInt(e.target.value) || 5)
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Receipt */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Printer className="w-5 h-5 text-primary" />
          Receipt Printing
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label>Auto Print Receipt</Label>
              <p className="text-xs text-muted-foreground">
                Print receipt automatically after sale
              </p>
            </div>
            <Switch
              checked={data.autoPrintReceipt}
              onCheckedChange={(v) => update("autoPrintReceipt", v)}
            />
          </div>
          {data.autoPrintReceipt && (
            <div className="space-y-2">
              <Label>Receipt Copies</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={data.receiptCopies}
                onChange={(e) =>
                  update("receiptCopies", parseInt(e.target.value) || 1)
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
