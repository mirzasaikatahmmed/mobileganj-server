"use client";

import { Plus, Plane, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const phones = [
  {
    id: "1",
    model: "iPhone 15 Pro Max",
    imei: "123456789012345",
    source: "Dubai Mobile Hub",
    carrier: "Karim Carrier",
    status: "With Carrier",
    amountPaid: 139000,
    lastUpdate: "2024-01-28",
  },
  {
    id: "2",
    model: "Samsung S24 Ultra",
    imei: "987654321098765",
    source: "Singapore Tech",
    carrier: "Rahim Carrier",
    status: "Delivered",
    amountPaid: 129000,
    lastUpdate: "2024-01-27",
  },
  {
    id: "3",
    model: "iPhone 14 Pro",
    imei: "456789012345678",
    source: "Dubai Mobile Hub",
    carrier: "Karim Carrier",
    status: "Sent to Carrier",
    amountPaid: 95000,
    lastUpdate: "2024-01-29",
  },
];

export default function OverseasTrackingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Plane className="w-8 h-8" />
            Overseas Phone Tracking
          </h1>
          <p className="text-muted-foreground">
            Admin Only - Track international phone movement
          </p>
        </div>
        <Link href="/admin/overseas-tracking/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Phone Entry
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Phones</p>
          <h3 className="text-2xl font-bold mt-1">73</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Purchased</p>
          <h3 className="text-2xl font-bold mt-1">12</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">With Carrier</p>
          <h3 className="text-2xl font-bold mt-1 text-orange-600">28</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Returned</p>
          <h3 className="text-2xl font-bold mt-1 text-blue-600">15</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Delivered</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">18</h3>
        </div>
      </div>

      <div className="card-base p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by model, IMEI, source..."
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="purchased">Purchased</SelectItem>
              <SelectItem value="sent">Sent to Carrier</SelectItem>
              <SelectItem value="with-carrier">With Carrier</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Carrier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Carriers</SelectItem>
              <SelectItem value="karim">Karim Carrier</SelectItem>
              <SelectItem value="rahim">Rahim Carrier</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Phone Model</th>
                <th className="text-left p-4 font-semibold">IMEI</th>
                <th className="text-left p-4 font-semibold">Source</th>
                <th className="text-left p-4 font-semibold">Carrier</th>
                <th className="text-right p-4 font-semibold">Amount Paid</th>
                <th className="text-center p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Last Update</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {phones.map((phone) => (
                <tr key={phone.id} className="border-t hover:bg-muted/30">
                  <td className="p-4 font-medium">{phone.model}</td>
                  <td className="p-4 font-mono text-sm text-muted-foreground">
                    {phone.imei}
                  </td>
                  <td className="p-4">{phone.source}</td>
                  <td className="p-4">{phone.carrier}</td>
                  <td className="p-4 text-right font-semibold">
                    ৳{phone.amountPaid.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        phone.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : phone.status === "With Carrier"
                            ? "bg-orange-100 text-orange-700"
                            : phone.status === "Sent to Carrier"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {phone.status}
                    </span>
                  </td>
                  <td className="p-4">{phone.lastUpdate}</td>
                  <td className="p-4 text-center">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Carrier Summary */}
      <div className="card-base p-6">
        <h3 className="font-semibold text-lg mb-4">Carrier Breakdown</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">Karim Carrier</p>
            <p className="text-xl font-bold mt-1">18 phones</p>
            <p className="text-sm text-orange-600 mt-1">
              12 currently with carrier
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">Rahim Carrier</p>
            <p className="text-xl font-bold mt-1">15 phones</p>
            <p className="text-sm text-orange-600 mt-1">
              8 currently with carrier
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">Others</p>
            <p className="text-xl font-bold mt-1">10 phones</p>
            <p className="text-sm text-orange-600 mt-1">
              5 currently with carrier
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
