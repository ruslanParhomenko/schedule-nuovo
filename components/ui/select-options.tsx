import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export default function SelectOptions({
  options,
  value,
  onChange,
  disabled,
  className,
  placeHolder,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  className?: string;
  placeHolder?: string;
}) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value)}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn(
          "bg-background justify-center border-0 shadow-none [&>svg]:hidden",
          className,
        )}
      >
        <SelectValue placeholder={placeHolder ?? ""} />
      </SelectTrigger>
      <SelectContent className="mt-4">
        <div className="grid grid-cols-2 gap-3 p-1">
          {options.map((item, idx) => (
            <SelectItem
              key={`${item.value}-${idx}`}
              value={item.value}
              className={cn(
                "border-border flex h-8 items-center justify-center border p-0 px-2 text-center [&>span:first-child]:hidden",
                value === item.value && "bg-red-600 text-white",
              )}
            >
              {item.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
