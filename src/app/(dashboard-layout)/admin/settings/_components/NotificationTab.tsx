"use client";

import { NotificationSettings } from "@/types/settings";
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
import { MessageSquare, Mail, Bell } from "lucide-react";

interface Props {
  data: NotificationSettings;
  onChange: (data: NotificationSettings) => void;
}

export default function NotificationTab({ data, onChange }: Props) {
  const update = <K extends keyof NotificationSettings>(
    field: K,
    value: NotificationSettings[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* SMS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">
                Send SMS alerts to customers
              </p>
            </div>
          </div>
          <Switch
            checked={data.enableSMS}
            onCheckedChange={(v) => update("enableSMS", v)}
          />
        </div>

        {data.enableSMS && (
          <div className="space-y-4 pl-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>SMS Provider</Label>
                <Select
                  value={data.smsProvider}
                  onValueChange={(v) =>
                    update(
                      "smsProvider",
                      v as NotificationSettings["smsProvider"],
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bulsms">BulSMS (BD)</SelectItem>
                    <SelectItem value="sslsms">SSL SMS (BD)</SelectItem>
                    <SelectItem value="infobip">Infobip</SelectItem>
                    <SelectItem value="twilio">Twilio</SelectItem>
                    <SelectItem value="custom">Custom API</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sender ID</Label>
                <Input
                  value={data.smsSenderId}
                  onChange={(e) => update("smsSenderId", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input
                  type="password"
                  value={data.smsApiKey}
                  onChange={(e) => update("smsApiKey", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>API Secret</Label>
                <Input
                  type="password"
                  value={data.smsApiSecret}
                  onChange={(e) => update("smsApiSecret", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Send SMS on:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    key: "sendOnSale" as const,
                    label: "New Sale / Purchase Confirmation",
                  },
                  {
                    key: "sendOnDueReminder" as const,
                    label: "Due Payment Reminder",
                  },
                  {
                    key: "sendOnWarrantyExpiry" as const,
                    label: "Warranty Expiry Alert",
                  },
                  { key: "sendOnEMIDue" as const, label: "EMI Due Reminder" },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <Label className="cursor-pointer text-sm">{label}</Label>
                    <Switch
                      checked={data[key]}
                      onCheckedChange={(v) => update(key, v)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {data.smsBalance > 0 && (
              <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  SMS Balance:{" "}
                  <span className="font-bold">{data.smsBalance}</span> SMS
                  remaining
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Email */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Send email alerts and invoices
              </p>
            </div>
          </div>
          <Switch
            checked={data.enableEmail}
            onCheckedChange={(v) => update("enableEmail", v)}
          />
        </div>

        {data.enableEmail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
            <div className="space-y-2">
              <Label>Email Provider</Label>
              <Select
                value={data.emailProvider}
                onValueChange={(v) =>
                  update(
                    "emailProvider",
                    v as NotificationSettings["emailProvider"],
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smtp">SMTP</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="mailgun">Mailgun</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>SMTP Host</Label>
              <Input
                value={data.emailHost}
                onChange={(e) => update("emailHost", e.target.value)}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label>SMTP Port</Label>
              <Input
                type="number"
                value={data.emailPort}
                onChange={(e) =>
                  update("emailPort", parseInt(e.target.value) || 587)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Email / Username</Label>
              <Input
                value={data.emailUser}
                onChange={(e) => update("emailUser", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Password / API Key</Label>
              <Input
                type="password"
                value={data.emailPassword}
                onChange={(e) => update("emailPassword", e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Push Notifications */}
      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-primary" />
          <div>
            <p className="font-semibold">Push Notifications</p>
            <p className="text-sm text-muted-foreground">
              Browser push notifications for admins
            </p>
          </div>
        </div>
        <Switch
          checked={data.enablePushNotification}
          onCheckedChange={(v) => update("enablePushNotification", v)}
        />
      </div>
    </div>
  );
}
