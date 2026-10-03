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
import { Label } from "../ui/label";

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
    <div className="w-full flex flex-col items-center justify-center">
      <Label
        htmlFor={name}
        className="block w-full text-center text-md  mb-6 cursor-pointer h-6"
      >
        {value ? "" : placeholder}
      </Label>

      <Select value={value} onValueChange={setValue}>
        <SelectTrigger
          id={name}
          className={cn(
            "[&>svg]:hidden justify-center md:w-120 w-full text-blue-600 bg-border h-14! font-bold",
            className,
          )}
        >
          <SelectValue placeholder="" className="font-bold" />
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
    </div>
  );
}
