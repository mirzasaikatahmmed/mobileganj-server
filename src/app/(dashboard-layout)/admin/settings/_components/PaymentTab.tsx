"use client";

import { PaymentSettings } from "@/types/settings";
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
import { Wallet, Landmark, CreditCard, Globe } from "lucide-react";

interface Props {
  data: PaymentSettings;
  onChange: (data: PaymentSettings) => void;
}

export default function PaymentTab({ data, onChange }: Props) {
  const update = <K extends keyof PaymentSettings>(
    field: K,
    value: PaymentSettings[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* Mobile Banking */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Wallet className="w-5 h-5 text-primary" />
          Mobile Banking
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cash */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <Label className="font-medium">💵 Cash Payment</Label>
            <Switch
              checked={data.enableCash}
              onCheckedChange={(v) => update("enableCash", v)}
            />
          </div>

          {/* bKash */}
          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium text-pink-600">bKash</Label>
              <Switch
                checked={data.enableBkash}
                onCheckedChange={(v) => update("enableBkash", v)}
              />
            </div>
            {data.enableBkash && (
              <Input
                value={data.bkashNumber}
                onChange={(e) => update("bkashNumber", e.target.value)}
                placeholder="bKash Number"
              />
            )}
          </div>

          {/* Nagad */}
          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium text-orange-600">Nagad</Label>
              <Switch
                checked={data.enableNagad}
                onCheckedChange={(v) => update("enableNagad", v)}
              />
            </div>
            {data.enableNagad && (
              <Input
                value={data.nagadNumber}
                onChange={(e) => update("nagadNumber", e.target.value)}
                placeholder="Nagad Number"
              />
            )}
          </div>

          {/* Rocket */}
          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium text-purple-600">Rocket</Label>
              <Switch
                checked={data.enableRocket}
                onCheckedChange={(v) => update("enableRocket", v)}
              />
            </div>
            {data.enableRocket && (
              <Input
                value={data.rocketNumber}
                onChange={(e) => update("rocketNumber", e.target.value)}
                placeholder="Rocket Number"
              />
            )}
          </div>

          {/* Upay */}
          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium text-blue-600">Upay</Label>
              <Switch
                checked={data.enableUpay}
                onCheckedChange={(v) => update("enableUpay", v)}
              />
            </div>
            {data.enableUpay && (
              <Input
                value={data.upayNumber}
                onChange={(e) => update("upayNumber", e.target.value)}
                placeholder="Upay Number"
              />
            )}
          </div>

          {/* Card */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <Label className="font-medium flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Card Payment
            </Label>
            <Switch
              checked={data.enableCard}
              onCheckedChange={(v) => update("enableCard", v)}
            />
          </div>
        </div>
      </div>

      {/* Bank Transfer */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Landmark className="w-5 h-5 text-primary" />
          Bank Transfer
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg mb-4">
          <Label>Enable Bank Transfer</Label>
          <Switch
            checked={data.enableBankTransfer}
            onCheckedChange={(v) => update("enableBankTransfer", v)}
          />
        </div>
        {data.enableBankTransfer && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Input
                value={data.bankName}
                onChange={(e) => update("bankName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Account Name</Label>
              <Input
                value={data.bankAccountName}
                onChange={(e) => update("bankAccountName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input
                value={data.bankAccountNumber}
                onChange={(e) => update("bankAccountNumber", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Branch</Label>
              <Input
                value={data.bankBranch}
                onChange={(e) => update("bankBranch", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Routing Number</Label>
              <Input
                value={data.bankRoutingNumber}
                onChange={(e) => update("bankRoutingNumber", e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Online Payment */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Globe className="w-5 h-5 text-primary" />
          Online Payment Gateway
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg mb-4">
          <div>
            <Label>Enable Online Payment</Label>
            <p className="text-xs text-muted-foreground">
              Accept payments through online gateways
            </p>
          </div>
          <Switch
            checked={data.enableOnlinePayment}
            onCheckedChange={(v) => update("enableOnlinePayment", v)}
          />
        </div>
        {data.enableOnlinePayment && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Payment Gateway</Label>
              <Select
                value={data.onlinePaymentGateway}
                onValueChange={(v) =>
                  update(
                    "onlinePaymentGateway",
                    v as PaymentSettings["onlinePaymentGateway"],
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sslcommerz">SSLCommerz</SelectItem>
                  <SelectItem value="aamarpay">AamarPay</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>API Key / Store ID</Label>
              <Input
                type="password"
                value={data.onlinePaymentApiKey}
                onChange={(e) => update("onlinePaymentApiKey", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>API Secret / Store Password</Label>
              <Input
                type="password"
                value={data.onlinePaymentApiSecret}
                onChange={(e) =>
                  update("onlinePaymentApiSecret", e.target.value)
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
