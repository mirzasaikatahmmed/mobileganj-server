"use client";

import { AppearanceSettings } from "@/types/settings";
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
import { Paintbrush, Type, Image, Megaphone } from "lucide-react";

interface Props {
  data: AppearanceSettings;
  onChange: (data: AppearanceSettings) => void;
}

export default function AppearanceTab({ data, onChange }: Props) {
  const update = <K extends keyof AppearanceSettings>(
    field: K,
    value: AppearanceSettings[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* Colors & Theme */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Paintbrush className="w-5 h-5 text-primary" />
          Colors & Theme
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Primary Color</Label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={data.primaryColor}
                onChange={(e) => update("primaryColor", e.target.value)}
                className="w-10 h-10 rounded-lg border cursor-pointer"
                title="Primary Color"
              />
              <Input
                value={data.primaryColor}
                onChange={(e) => update("primaryColor", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Accent Color</Label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={data.accentColor}
                onChange={(e) => update("accentColor", e.target.value)}
                className="w-10 h-10 rounded-lg border cursor-pointer"
                title="Accent Color"
              />
              <Input
                value={data.accentColor}
                onChange={(e) => update("accentColor", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={data.theme}
              onValueChange={(v) =>
                update("theme", v as AppearanceSettings["theme"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Color Preview */}
        <div className="flex gap-4">
          <div
            className="flex-1 h-20 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: data.primaryColor }}
          >
            Primary
          </div>
          <div
            className="flex-1 h-20 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: data.accentColor }}
          >
            Accent
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Type className="w-5 h-5 text-primary" />
          Hero Section
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Hero Text (English)</Label>
            <Input
              value={data.heroText}
              onChange={(e) => update("heroText", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Text (বাংলা)</Label>
            <Input
              value={data.heroTextBn}
              onChange={(e) => update("heroTextBn", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Subtext (English)</Label>
            <Input
              value={data.heroSubtext}
              onChange={(e) => update("heroSubtext", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Subtext (বাংলা)</Label>
            <Input
              value={data.heroSubtextBn}
              onChange={(e) => update("heroSubtextBn", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Image className="w-5 h-5 text-primary" />
          Banner
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <Label>Show Banner</Label>
          <Switch
            checked={data.showBanner}
            onCheckedChange={(v) => update("showBanner", v)}
          />
        </div>
        {data.showBanner && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Banner Image URL</Label>
              <Input
                value={data.bannerImage}
                onChange={(e) => update("bannerImage", e.target.value)}
                placeholder="/banner.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label>Banner Link</Label>
              <Input
                value={data.bannerLink}
                onChange={(e) => update("bannerLink", e.target.value)}
                placeholder="/offers"
              />
            </div>
          </div>
        )}
      </div>

      {/* Top Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Megaphone className="w-5 h-5 text-primary" />
          Top Bar Announcement
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <Label>Show Top Bar</Label>
          <Switch
            checked={data.showTopBar}
            onCheckedChange={(v) => update("showTopBar", v)}
          />
        </div>
        {data.showTopBar && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Message (English)</Label>
              <Input
                value={data.topBarMessage}
                onChange={(e) => update("topBarMessage", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Message (বাংলা)</Label>
              <Input
                value={data.topBarMessageBn}
                onChange={(e) => update("topBarMessageBn", e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
