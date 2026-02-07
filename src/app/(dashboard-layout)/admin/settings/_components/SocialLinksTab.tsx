"use client";

import { SocialLinks } from "@/types/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Send,
} from "lucide-react";

interface Props {
  data: SocialLinks;
  onChange: (data: SocialLinks) => void;
}

export default function SocialLinksTab({ data, onChange }: Props) {
  const update = (field: keyof SocialLinks, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const socialFields: {
    key: keyof SocialLinks;
    label: string;
    icon: React.ElementType;
    placeholder: string;
    color: string;
  }[] = [
    {
      key: "facebook",
      label: "Facebook",
      icon: Facebook,
      placeholder: "https://facebook.com/mobileganj",
      color: "text-blue-600",
    },
    {
      key: "instagram",
      label: "Instagram",
      icon: Instagram,
      placeholder: "https://instagram.com/mobileganj",
      color: "text-pink-600",
    },
    {
      key: "youtube",
      label: "YouTube",
      icon: Youtube,
      placeholder: "https://youtube.com/@mobileganj",
      color: "text-red-600",
    },
    {
      key: "tiktok",
      label: "TikTok",
      icon: Youtube,
      placeholder: "https://tiktok.com/@mobileganj",
      color: "text-foreground",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      placeholder: "01700000000",
      color: "text-green-600",
    },
    {
      key: "telegram",
      label: "Telegram",
      icon: Send,
      placeholder: "https://t.me/mobileganj",
      color: "text-sky-500",
    },
    {
      key: "messenger",
      label: "Messenger",
      icon: MessageCircle,
      placeholder: "https://m.me/mobileganj",
      color: "text-blue-500",
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Connect your social media accounts. These will be displayed on the
        website footer and contact page.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialFields.map(({ key, label, icon: Icon, placeholder, color }) => (
          <div key={key} className="space-y-2">
            <Label className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${color}`} />
              {label}
            </Label>
            <Input
              value={data[key]}
              onChange={(e) => update(key, e.target.value)}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
