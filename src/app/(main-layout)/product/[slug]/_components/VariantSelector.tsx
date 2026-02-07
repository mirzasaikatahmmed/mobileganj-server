"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ProductVariant, Region } from "@/types/product";
import { motion } from "framer-motion";
import { HardDrive, Palette, Cpu, Globe } from "lucide-react";

interface VariantSelectorProps {
  variants?: ProductVariant[];
  onVariantChange?: (variant: ProductVariant) => void;
}

export default function VariantSelector({
  variants,
  onVariantChange,
}: VariantSelectorProps) {
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedRam, setSelectedRam] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<Region | "">("");

  if (!variants || variants.length === 0) return null;

  // Extract unique options
  const storageOptions = [
    ...new Set(variants.map((v) => v.storage).filter(Boolean)),
  ];
  const colorOptions = [
    ...new Set(variants.map((v) => v.color).filter(Boolean)),
  ];
  const ramOptions = [...new Set(variants.map((v) => v.ram).filter(Boolean))];
  const regionOptions = [
    ...new Set(variants.map((v) => v.region).filter(Boolean)),
  ];

  const OptionButton = ({
    label,
    isSelected,
    onClick,
  }: {
    label: string;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`relative px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      {isSelected && (
        <motion.div
          layoutId="variant-check"
          className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center"
        >
          <svg
            className="h-2.5 w-2.5 text-primary-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}
    </button>
  );

  return (
    <div className="space-y-5">
      {/* Storage */}
      {storageOptions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-muted-foreground" />
            স্টোরেজ
          </h3>
          <div className="flex flex-wrap gap-2">
            {storageOptions.map((storage) => (
              <OptionButton
                key={storage}
                label={storage!}
                isSelected={selectedStorage === storage}
                onClick={() => setSelectedStorage(storage!)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Color */}
      {colorOptions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            কালার
          </h3>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <OptionButton
                key={color}
                label={color!}
                isSelected={selectedColor === color}
                onClick={() => setSelectedColor(color!)}
              />
            ))}
          </div>
        </div>
      )}

      {/* RAM */}
      {ramOptions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-muted-foreground" />
            RAM
          </h3>
          <div className="flex flex-wrap gap-2">
            {ramOptions.map((ram) => (
              <OptionButton
                key={ram}
                label={ram!}
                isSelected={selectedRam === ram}
                onClick={() => setSelectedRam(ram!)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Region */}
      {regionOptions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            রিজিয়ন
          </h3>
          <div className="flex flex-wrap gap-2">
            {regionOptions.map((region) => (
              <OptionButton
                key={region}
                label={region!}
                isSelected={selectedRegion === region}
                onClick={() => setSelectedRegion(region!)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Selected Configuration Summary */}
      {(selectedStorage || selectedColor || selectedRam || selectedRegion) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3 rounded-xl bg-primary/5 border border-primary/15"
        >
          <p className="text-xs font-medium text-muted-foreground mb-2">
            নির্বাচিত কনফিগারেশন:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selectedStorage && (
              <Badge variant="secondary" className="text-xs">
                {selectedStorage}
              </Badge>
            )}
            {selectedColor && (
              <Badge variant="secondary" className="text-xs">
                {selectedColor}
              </Badge>
            )}
            {selectedRam && (
              <Badge variant="secondary" className="text-xs">
                {selectedRam}
              </Badge>
            )}
            {selectedRegion && (
              <Badge variant="secondary" className="text-xs">
                {selectedRegion}
              </Badge>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
