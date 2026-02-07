"use client";

import { DeliverySettings, DeliveryArea } from "@/types/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck, MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  data: DeliverySettings;
  onChange: (data: DeliverySettings) => void;
}

export default function DeliveryTab({ data, onChange }: Props) {
  const update = <K extends keyof DeliverySettings>(
    field: K,
    value: DeliverySettings[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  const [newArea, setNewArea] = useState<Partial<DeliveryArea>>({
    name: "",
    charge: 0,
    estimatedDays: 1,
  });

  const addArea = () => {
    if (newArea.name?.trim()) {
      const area: DeliveryArea = {
        id: Date.now().toString(),
        name: newArea.name.trim(),
        charge: newArea.charge || 0,
        estimatedDays: newArea.estimatedDays || 1,
      };
      update("deliveryAreas", [...data.deliveryAreas, area]);
      setNewArea({ name: "", charge: 0, estimatedDays: 1 });
    }
  };

  const removeArea = (id: string) => {
    update(
      "deliveryAreas",
      data.deliveryAreas.filter((a) => a.id !== id),
    );
  };

  return (
    <div className="space-y-8">
      {/* Enable Delivery */}
      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
        <div className="flex items-center gap-3">
          <Truck className="w-6 h-6 text-primary" />
          <div>
            <p className="font-semibold">Enable Delivery</p>
            <p className="text-sm text-muted-foreground">
              Allow home delivery for orders
            </p>
          </div>
        </div>
        <Switch
          checked={data.enableDelivery}
          onCheckedChange={(v) => update("enableDelivery", v)}
        />
      </div>

      {data.enableDelivery && (
        <>
          {/* Basic Delivery Settings */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Default Delivery Charge (৳)</Label>
                <Input
                  type="number"
                  value={data.defaultDeliveryCharge}
                  onChange={(e) =>
                    update(
                      "defaultDeliveryCharge",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Free Delivery Min Amount (৳)</Label>
                <Input
                  type="number"
                  value={data.freeDeliveryMinAmount}
                  onChange={(e) =>
                    update(
                      "freeDeliveryMinAmount",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Estimated Delivery Days</Label>
                <Input
                  type="number"
                  value={data.estimatedDeliveryDays}
                  onChange={(e) =>
                    update(
                      "estimatedDeliveryDays",
                      parseInt(e.target.value) || 1,
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Delivery Areas */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <MapPin className="w-5 h-5 text-primary" />
              Delivery Areas
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 text-sm font-semibold">
                      Area Name
                    </th>
                    <th className="text-left p-3 text-sm font-semibold">
                      Charge (৳)
                    </th>
                    <th className="text-left p-3 text-sm font-semibold">
                      Days
                    </th>
                    <th className="text-right p-3 text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.deliveryAreas.map((area) => (
                    <tr key={area.id} className="border-t">
                      <td className="p-3">{area.name}</td>
                      <td className="p-3">৳{area.charge}</td>
                      <td className="p-3">
                        {area.estimatedDays} day
                        {area.estimatedDays > 1 ? "s" : ""}
                      </td>
                      <td className="p-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeArea(area.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t bg-muted/20">
                    <td className="p-3">
                      <Input
                        placeholder="Area name"
                        value={newArea.name}
                        onChange={(e) =>
                          setNewArea({ ...newArea, name: e.target.value })
                        }
                        className="h-9"
                      />
                    </td>
                    <td className="p-3">
                      <Input
                        type="number"
                        placeholder="Charge"
                        value={newArea.charge}
                        onChange={(e) =>
                          setNewArea({
                            ...newArea,
                            charge: parseInt(e.target.value) || 0,
                          })
                        }
                        className="h-9"
                      />
                    </td>
                    <td className="p-3">
                      <Input
                        type="number"
                        placeholder="Days"
                        value={newArea.estimatedDays}
                        onChange={(e) =>
                          setNewArea({
                            ...newArea,
                            estimatedDays: parseInt(e.target.value) || 1,
                          })
                        }
                        className="h-9"
                      />
                    </td>
                    <td className="p-3 text-right">
                      <Button size="sm" onClick={addArea}>
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Courier Integration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">Courier Integration</p>
                  <p className="text-sm text-muted-foreground">
                    Integrate with courier services for automated shipping
                  </p>
                </div>
              </div>
              <Switch
                checked={data.enableCourierIntegration}
                onCheckedChange={(v) => update("enableCourierIntegration", v)}
              />
            </div>

            {data.enableCourierIntegration && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
                <div className="space-y-2 md:col-span-2">
                  <Label>Courier Provider</Label>
                  <Select
                    value={data.courierProvider}
                    onValueChange={(v) =>
                      update(
                        "courierProvider",
                        v as DeliverySettings["courierProvider"],
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pathao">Pathao Courier</SelectItem>
                      <SelectItem value="steadfast">Steadfast</SelectItem>
                      <SelectItem value="redx">RedX</SelectItem>
                      <SelectItem value="paperfly">Paperfly</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input
                    type="password"
                    value={data.courierApiKey}
                    onChange={(e) => update("courierApiKey", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>API Secret</Label>
                  <Input
                    type="password"
                    value={data.courierApiSecret}
                    onChange={(e) => update("courierApiSecret", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
