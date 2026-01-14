"use client";
import { MONTHS } from "@/utils/get-month-days";
import { useEffect, useState, useTransition } from "react";

import { usePathname, useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";
import { NAV_BY_PATCH } from "./constants";
import SelectTabsByPatch from "./select-patch";
import SelectByMonthYear from "./select-month";

export default function NavMenuHeader() {
  const mainRoute = usePathname().split("/")[1];
  const navItems =
    NAV_BY_PATCH[mainRoute as keyof typeof NAV_BY_PATCH]?.navItems;

  const router = useRouter();

  const [month, setMonth] = useState(MONTHS[new Date().getMonth()]);
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [patch, setPatch] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!navItems || navItems.length === 0) {
      setPatch("");
      return;
    }

    setPatch(navItems[0].href);
  }, [navItems]);

  useEffect(() => {
    const url = `/${mainRoute}/${patch}?month=${month}&year=${year}`;

    startTransition(() => {
      router.push(url);
    });
  }, [patch, month, year, mainRoute, router]);

  const resetParams = () => {
    setPatch("");

    router.push(`/${mainRoute}`);
  };
  return (
    <div className="py-2  flex justify-center md:justify-start md:gap-4 gap-1.5">
      {navItems.length > 0 && (
        <SelectTabsByPatch
          patch={navItems.length > 0 ? patch : ""}
          setPatch={setPatch}
          isPending={isPending}
          navItems={navItems}
        />
      )}

      <SelectByMonthYear
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
        isLoading={isPending}
        classNameMonthYear={navItems.length > 0 ? "w-15" : "w-24"}
      />

      <button
        onClick={resetParams}
        className="hover:text-black text-bl hover:bg-transparent cursor-pointer md:w-24 md:order-3 order-0 px-2"
      >
        <RefreshCcw className="w-4 h-4" />
      </button>
    </div>
  );
}
