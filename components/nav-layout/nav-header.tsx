"use client";
import { MONTHS } from "@/utils/get-month-days";
import SelectOptions from "../ui/select-options";
import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LogOutButton from "../buttons/logout-button";
import ThemesButton from "../buttons/themes-button";

export default function NavHeader() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentMonthIndex = new Date().getMonth();
  const filteredMonths = [
    MONTHS[currentMonthIndex],
    MONTHS[(currentMonthIndex + 1) % 12],
  ];

  const currentMonth = searchParams.get("month");
  const initialMonth = currentMonth || MONTHS[currentMonthIndex];

  const setMonth = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", value);
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="bg-background sticky top-2 z-20 my-2 flex justify-between px-4 md:gap-4">
      <div className="order-1 flex gap-4 md:order-0">
        <SelectOptions
          options={filteredMonths.map((item) => ({
            value: item,
            label: item.slice(0, 3).toUpperCase(),
          }))}
          value={initialMonth}
          onChange={setMonth}
          disabled={isPending || pathname === "/swap"}
          className="w-22 text-xs  h-8! text-bl font-bold border-0 shadow-none"
        />
      </div>

      <div className="flex gap-8">
        <LogOutButton />
        <ThemesButton />
      </div>
    </div>
  );
}
