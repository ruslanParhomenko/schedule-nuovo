import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export type Options = readonly string[];
export default function TabsOptions({
  value,
  setValue,
  isPending,
  options,
}: {
  value: string;
  setValue: (value: string) => void;
  isPending: boolean;
  options: Options;
}) {
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList className="flex h-9 md:gap-2">
        {options.map((item, idx) => (
          <TabsTrigger
            key={`${item}-${idx}`}
            value={item}
            disabled={isPending}
            className={cn(
              "hover:text-bl w-18 cursor-pointer md:w-24",
              isPending && "opacity-50",
            )}
          >
            <span className="md:text-md text-bl block w-full truncate text-xs">
              {item}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
