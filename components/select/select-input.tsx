"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

export default function SelectInput({
  options,
  placeholder,
  className,
  name,
}: {
  options: Option[];
  placeholder?: string;
  className?: string;
  name: string;
}) {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger
          className={cn(
            "[&>svg]:hidden justify-start w-full md:w-24 text-blue-500",
            className,
          )}
        >
          <SelectValue placeholder={placeholder ?? ""} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="[&>span]:hidden"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input type="hidden" name={name} value={value} />
    </>
  );
}
