"use client";
import { MONTHS } from "@/utils/get-month-days";
import { useEffect, useState, useTransition } from "react";

import { usePathname, useRouter } from "next/navigation";
import { NAV_BY_PATCH } from "./constants";
import { useHashParam } from "@/hooks/use-hash";
import TabsOptions from "../tabs/tabs-options";
import SelectOptions from "../select/select-options";
import ThemesButton from "../buttons/themes-button";
import LogOutButton from "../buttons/logout-button";

export default function NavMenu({ children }: { children: React.ReactNode }) {
  const patchName = usePathname().split("/")[1];
  const navItems =
    NAV_BY_PATCH[patchName as keyof typeof NAV_BY_PATCH]?.navItems;

  const STORAGE_KEY = `nav-tab-${patchName}`;

  const router = useRouter();

  const [_value, setHash] = useHashParam("tab");
  const [tab, setTab] = useState<string>(navItems?.[0]?.label || "");

  const [month, setMonth] = useState(MONTHS[new Date().getMonth()]);
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (value: string) => {
    setTab(value);
    localStorage.setItem(STORAGE_KEY, value);
    setHash(value);
  };

  useEffect(() => {
    const url = `/${patchName}?month=${month}`;

    startTransition(() => {
      router.push(url);
    });
  }, [month, patchName, router]);

  useEffect(() => {
    if (patchName !== "schedule") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTab(stored);
      setHash(stored);
    } else {
      setHash(navItems[0].value);
    }
  }, [STORAGE_KEY, patchName, setHash]);

  const currentMonthIndex = new Date().getMonth();

  const filteredMonths = [
    MONTHS[(currentMonthIndex - 1 + 12) % 12],
    MONTHS[currentMonthIndex],
    MONTHS[(currentMonthIndex + 1) % 12],
  ];

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="bg-background sticky top-2 z-20 my-2 flex justify-between px-4 md:gap-4">
        <div className="order-1 flex gap-4 md:order-0">
          {NAV_BY_PATCH[patchName as keyof typeof NAV_BY_PATCH]
            ?.filterMonths && (
            <SelectOptions
              options={filteredMonths.map((item) => ({
                value: item,
                label: item.slice(0, 3).toUpperCase(),
              }))}
              value={month}
              onChange={setMonth}
              isLoading={isPending}
              className="w-22 text-xs border h-8! text-bl font-bold"
            />
          )}
        </div>

        <div className="flex gap-8">
          <LogOutButton />
          <ThemesButton />
        </div>
      </div>

      <div className="flex flex-1 justify-center items-center h-full mt-auto">
        {children}
      </div>

      <div className="bg-background sticky bottom-3 z-20 flex items-center justify-between gap-2 px-4 pb-1 md:my-1 md:justify-start md:gap-4">
        {navItems.length > 0 && (
          <TabsOptions
            value={tab}
            setValue={handleTabChange}
            isPending={isPending}
            options={navItems}
          />
        )}

        {patchName === "schedule" && (
          <button
            onClick={() => router.push("/swap")}
            className="hover:text-black text-rd text-xs font-bold hover:bg-transparent shadow rounded-md h-8  w-18 cursor-pointer md:w-24"
          >
            SWAP
          </button>
        )}
      </div>
    </div>
  );
}
