import { cn } from "@/lib/utils";

import { PageNavType } from "./constants";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function SelectTabsByPatch({
  patch,
  setPatch,
  isPending,
  navItems,
}: {
  patch: string;
  setPatch: (value: string) => void;
  isPending: boolean;
  navItems: PageNavType[];
}) {
  return (
    <Tabs
      value={patch}
      onValueChange={(value: string) => setPatch(value)}
      className="order-3 md:order-0"
    >
      <TabsList className="flex md:gap-2 h-8">
        {navItems.map((page) => (
          <TabsTrigger
            key={page.title}
            value={page.href}
            disabled={isPending}
            className={cn(
              "md:w-24 w-16 hover:text-bl cursor-pointer",
              isPending && "opacity-50"
            )}
          >
            <span className="truncate block w-full text-xs md:text-md text-bl">
              {page.title}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
