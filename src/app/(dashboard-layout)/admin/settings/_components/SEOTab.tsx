"use client";

import { SEOSettings } from "@/types/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Search, BarChart3, X } from "lucide-react";
import { useState } from "react";

interface Props {
  data: SEOSettings;
  onChange: (data: SEOSettings) => void;
}

export default function SEOTab({ data, onChange }: Props) {
  const [newKeyword, setNewKeyword] = useState("");

  const update = <K extends keyof SEOSettings>(
    field: K,
    value: SEOSettings[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !data.metaKeywords.includes(newKeyword.trim())) {
      update("metaKeywords", [...data.metaKeywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (kw: string) => {
    update(
      "metaKeywords",
      data.metaKeywords.filter((k) => k !== kw),
    );
  };

  return (
    <div className="space-y-8">
      {/* Meta Tags */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Search className="w-5 h-5 text-primary" />
          Meta Tags
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Meta Title</Label>
            <Input
              value={data.metaTitle}
              onChange={(e) => update("metaTitle", e.target.value)}
              placeholder="Mobile GANJ - Best Mobile Shop"
            />
            <p className="text-xs text-muted-foreground">
              {data.metaTitle.length}/60 characters
            </p>
          </div>
          <div className="space-y-2">
            <Label>Meta Description</Label>
            <Textarea
              value={data.metaDescription}
              onChange={(e) => update("metaDescription", e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              {data.metaDescription.length}/160 characters
            </p>
          </div>
          <div className="space-y-2">
            <Label>Meta Keywords</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {data.metaKeywords.map((kw) => (
                <Badge key={kw} variant="secondary" className="gap-1 px-3 py-1">
                  {kw}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeKeyword(kw)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 max-w-md">
              <Input
                placeholder="Add keyword..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addKeyword())
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>OG Image URL</Label>
            <Input
              value={data.ogImage}
              onChange={(e) => update("ogImage", e.target.value)}
              placeholder="/og-image.jpg"
            />
          </div>
        </div>

        {/* Google search preview */}
        <div className="p-4 border rounded-lg bg-white dark:bg-zinc-900">
          <p className="text-xs text-muted-foreground mb-2">
            Google Search Preview:
          </p>
          <p className="text-blue-600 dark:text-blue-400 text-lg font-medium truncate">
            {data.metaTitle || "Page Title"}
          </p>
          <p className="text-green-700 dark:text-green-500 text-sm">
            mobileganj.com
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {data.metaDescription || "Meta description will appear here..."}
          </p>
        </div>
      </div>

      {/* Analytics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <BarChart3 className="w-5 h-5 text-primary" />
          Analytics & Tracking
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Google Analytics ID</Label>
            <Input
              value={data.googleAnalyticsId}
              onChange={(e) => update("googleAnalyticsId", e.target.value)}
              placeholder="G-XXXXXXXXXX"
            />
          </div>
          <div className="space-y-2">
            <Label>Facebook Pixel ID</Label>
            <Input
              value={data.facebookPixelId}
              onChange={(e) => update("facebookPixelId", e.target.value)}
              placeholder="123456789012345"
            />
          </div>
          <div className="space-y-2">
            <Label>TikTok Pixel ID</Label>
            <Input
              value={data.tiktokPixelId}
              onChange={(e) => update("tiktokPixelId", e.target.value)}
              placeholder="XXXXXXXXXX"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
