"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X, RotateCcw } from "lucide-react";
import { brands } from "@/lib/mock-data";
import { ProductCondition, ProductCategory } from "@/types/product";

interface FilterSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const categoryLabels: Record<string, string> = {
  Phone: "ফোন",
  Accessories: "এক্সেসরিজ",
  Charger: "চার্জার",
  Earphone: "ইয়ারফোন",
  "Power Bank": "পাওয়ার ব্যাংক",
  Cover: "কভার",
  Glass: "গ্লাস প্রটেক্টর",
};

const conditionLabels: Record<string, string> = {
  "Brand New": "নতুন",
  Used: "ব্যবহৃত",
  "Like New": "নতুনের মতো",
};

export default function FilterSidebar({
  onClose,
  isMobile,
}: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const categories: ProductCategory[] = [
    "Phone",
    "Accessories",
    "Charger",
    "Earphone",
    "Power Bank",
    "Cover",
    "Glass",
  ];
  const conditions: ProductCondition[] = ["Brand New", "Used", "Like New"];

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleConditionToggle = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition],
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedConditions([]);
    setPriceRange([0, 200000]);
  };

  const activeFilterCount =
    selectedBrands.length +
    selectedCategories.length +
    selectedConditions.length +
    (priceRange[0] !== 0 || priceRange[1] !== 200000 ? 1 : 0);

  return (
    <div className="space-y-5 p-4">
      {isMobile && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">ফিল্টার</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full rounded-xl gap-2 text-sm"
        size="sm"
        onClick={clearFilters}
      >
        <RotateCcw className="h-3.5 w-3.5" />
        সব ফিল্টার মুছুন
        {activeFilterCount > 0 && (
          <span className="ml-auto bg-primary/10 text-primary text-xs font-semibold px-1.5 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
      </Button>

      <Separator />

      {/* Brand Filter */}
      <div>
        <h3 className="font-semibold text-sm mb-3">ব্র্যান্ড</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="cursor-pointer text-sm"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-sm mb-3">ক্যাটাগরি</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="cursor-pointer text-sm"
              >
                {categoryLabels[category] || category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-sm mb-3">মূল্য পরিসীমা</h3>
        <div className="px-1">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={200000}
            step={1000}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="bg-muted px-2 py-1 rounded-md">
              ৳{priceRange[0].toLocaleString("bn-BD")}
            </span>
            <span className="bg-muted px-2 py-1 rounded-md">
              ৳{priceRange[1].toLocaleString("bn-BD")}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Condition Filter */}
      <div>
        <h3 className="font-semibold text-sm mb-3">কন্ডিশন</h3>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={`condition-${condition}`}
                checked={selectedConditions.includes(condition)}
                onCheckedChange={() => handleConditionToggle(condition)}
              />
              <Label
                htmlFor={`condition-${condition}`}
                className="cursor-pointer text-sm"
              >
                {conditionLabels[condition] || condition}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
