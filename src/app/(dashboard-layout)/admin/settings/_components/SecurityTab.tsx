"use client";

import { SecuritySettings } from "@/types/settings";
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
import { Shield, Lock, Database, Clock } from "lucide-react";

interface Props {
  data: SecuritySettings;
  onChange: (data: SecuritySettings) => void;
}

export default function SecurityTab({ data, onChange }: Props) {
  const update = <K extends keyof SecuritySettings>(
    field: K,
    value: SecuritySettings[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* Authentication */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Shield className="w-5 h-5 text-primary" />
          Authentication
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-xs text-muted-foreground">
                Extra security for admin login
              </p>
            </div>
            <Switch
              checked={data.enableTwoFactor}
              onCheckedChange={(v) => update("enableTwoFactor", v)}
            />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label>Activity Log</Label>
              <p className="text-xs text-muted-foreground">
                Track all admin actions
              </p>
            </div>
            <Switch
              checked={data.enableActivityLog}
              onCheckedChange={(v) => update("enableActivityLog", v)}
            />
          </div>
        </div>
      </div>

      {/* Session & Login */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Lock className="w-5 h-5 text-primary" />
          Session & Login
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Session Timeout (minutes)</Label>
            <Input
              type="number"
              value={data.sessionTimeoutMinutes}
              onChange={(e) =>
                update("sessionTimeoutMinutes", parseInt(e.target.value) || 30)
              }
            />
            <p className="text-xs text-muted-foreground">
              {Math.round(data.sessionTimeoutMinutes / 60)} hours
            </p>
          </div>
          <div className="space-y-2">
            <Label>Max Login Attempts</Label>
            <Input
              type="number"
              value={data.maxLoginAttempts}
              onChange={(e) =>
                update("maxLoginAttempts", parseInt(e.target.value) || 3)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Min Password Length</Label>
            <Input
              type="number"
              value={data.passwordMinLength}
              onChange={(e) =>
                update("passwordMinLength", parseInt(e.target.value) || 6)
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <Label>Require Uppercase Letter</Label>
            <Switch
              checked={data.requireUppercase}
              onCheckedChange={(v) => update("requireUppercase", v)}
            />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <Label>Require Number</Label>
            <Switch
              checked={data.requireNumber}
              onCheckedChange={(v) => update("requireNumber", v)}
            />
          </div>
        </div>
      </div>

      {/* Backup */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Database className="w-5 h-5 text-primary" />
          Backup
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Backup Frequency</Label>
            <Select
              value={data.backupFrequency}
              onValueChange={(v) =>
                update(
                  "backupFrequency",
                  v as SecuritySettings["backupFrequency"],
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="manual">Manual Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Last Backup</Label>
            <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{data.lastBackupDate || "Never"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
