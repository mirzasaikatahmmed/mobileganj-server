"use client";

import { Plus, Wrench, Eye, Search } from "lucide-react";
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

const serviceJobs = [
  {
    id: "SRV-001",
    date: "2024-01-29",
    customer: "Karim Ahmed",
    phone: "01712345678",
    device: "iPhone 14 Pro",
    problem: "Screen replacement",
    total: 15000,
    paid: 15000,
    due: 0,
    status: "Delivered",
  },
  {
    id: "SRV-002",
    date: "2024-01-29",
    customer: "Fatima Rahman",
    phone: "01812345678",
    device: "Samsung S23",
    problem: "Battery issue",
    total: 8000,
    paid: 5000,
    due: 3000,
    status: "Working",
  },
  {
    id: "SRV-003",
    date: "2024-01-28",
    customer: "Rahim Khan",
    phone: "01912345678",
    device: "iPhone 13",
    problem: "Software update",
    total: 2000,
    paid: 2000,
    due: 0,
    status: "Ready",
  },
];

export default function ServicingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mobile Servicing</h1>
          <p className="text-muted-foreground">Manage repair & service jobs</p>
        </div>
        <Link href="/admin/servicing/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Service Job
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Jobs</p>
          <h3 className="text-2xl font-bold mt-1">156</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Service Income</p>
          <h3 className="text-2xl font-bold mt-1">৳385,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Service Due</p>
          <h3 className="text-2xl font-bold mt-1 text-red-600">৳45,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Pending Jobs</p>
          <h3 className="text-2xl font-bold mt-1 text-orange-600">12</h3>
        </div>
      </div>

      <div className="card-base p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by job ID, customer, phone..."
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="working">Working</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Job ID</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Customer</th>
                <th className="text-left p-4 font-semibold">Device</th>
                <th className="text-left p-4 font-semibold">Problem</th>
                <th className="text-right p-4 font-semibold">Total</th>
                <th className="text-right p-4 font-semibold">Due</th>
                <th className="text-center p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceJobs.map((job) => (
                <tr key={job.id} className="border-t hover:bg-muted/30">
                  <td className="p-4 font-mono font-medium">{job.id}</td>
                  <td className="p-4">{job.date}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{job.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.phone}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">{job.device}</td>
                  <td className="p-4 text-sm">{job.problem}</td>
                  <td className="p-4 text-right font-semibold">
                    ৳{job.total.toLocaleString()}
                  </td>
                  <td className="p-4 text-right text-red-600">
                    ৳{job.due.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        job.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : job.status === "Ready"
                            ? "bg-blue-100 text-blue-700"
                            : job.status === "Working"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Link href={`/admin/servicing/${job.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
