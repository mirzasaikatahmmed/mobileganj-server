"use client";

import { StoreInfo } from "@/types/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Clock, Globe, X } from "lucide-react";

const daysOfWeek = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

interface Props {
  data: StoreInfo;
  onChange: (data: StoreInfo) => void;
}

export default function StoreInfoTab({ data, onChange }: Props) {
  const update = (field: keyof StoreInfo, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const toggleDay = (day: string) => {
    const offDays = data.offDays.includes(day)
      ? data.offDays.filter((d) => d !== day)
      : [...data.offDays, day];
    update("offDays", offDays);
  };

  return (
    <div className="space-y-8">
      {/* Business Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Building2 className="w-5 h-5 text-primary" />
          Business Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Store Name (English)</Label>
            <Input
              value={data.storeName}
              onChange={(e) => update("storeName", e.target.value)}
              placeholder="Mobile GANJ"
            />
          </div>
          <div className="space-y-2">
            <Label>Store Name (বাংলা)</Label>
            <Input
              value={data.storeNameBn}
              onChange={(e) => update("storeNameBn", e.target.value)}
              placeholder="মোবাইল গঞ্জ"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Tagline</Label>
            <Input
              value={data.tagline}
              onChange={(e) => update("tagline", e.target.value)}
              placeholder="Your trusted mobile shop"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="info@mobileganj.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <Input
              value={data.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="https://mobileganj.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="01700000000"
            />
          </div>
          <div className="space-y-2">
            <Label>Alternate Phone</Label>
            <Input
              value={data.alternatePhone}
              onChange={(e) => update("alternatePhone", e.target.value)}
              placeholder="01800000000"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <MapPin className="w-5 h-5 text-primary" />
          Address
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label>Address (English)</Label>
            <Textarea
              value={data.address}
              onChange={(e) => update("address", e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Address (বাংলা)</Label>
            <Textarea
              value={data.addressBn}
              onChange={(e) => update("addressBn", e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              value={data.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>District</Label>
            <Input
              value={data.district}
              onChange={(e) => update("district", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Division</Label>
            <Input
              value={data.division}
              onChange={(e) => update("division", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Postal Code</Label>
            <Input
              value={data.postalCode}
              onChange={(e) => update("postalCode", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Google Map URL</Label>
            <Input
              value={data.googleMapUrl}
              onChange={(e) => update("googleMapUrl", e.target.value)}
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Clock className="w-5 h-5 text-primary" />
          Operating Hours
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Opening Time</Label>
            <Input
              type="time"
              value={data.openingHours}
              onChange={(e) => update("openingHours", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Closing Time</Label>
            <Input
              type="time"
              value={data.closingHours}
              onChange={(e) => update("closingHours", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Off Days</Label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <Badge
                key={day}
                variant={data.offDays.includes(day) ? "default" : "outline"}
                className="cursor-pointer select-none px-3 py-1.5 text-sm"
                onClick={() => toggleDay(day)}
              >
                {day}
                {data.offDays.includes(day) && <X className="w-3 h-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Globe className="w-5 h-5 text-primary" />
          Branding
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Logo URL</Label>
            <Input
              value={data.logo}
              onChange={(e) => update("logo", e.target.value)}
              placeholder="/logo.png"
            />
            {data.logo && (
              <div className="mt-2 p-4 border rounded-lg bg-muted/30 flex items-center justify-center">
                <img
                  src={data.logo}
                  alt="Logo Preview"
                  className="max-h-16 object-contain"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Favicon URL</Label>
            <Input
              value={data.favicon}
              onChange={(e) => update("favicon", e.target.value)}
              placeholder="/favicon.ico"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
