"use client";
import { MONTHS } from "@/utils/get-month-days";
import {
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  useTransition,
} from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import TabsOptions from "../tabs/tabs-options";
import SelectOptions from "../select/select-options";
import ThemesButton from "../buttons/themes-button";
import LogOutButton from "../buttons/logout-button";
import { useSwipeable } from "react-swipeable";
export const NAV_ITEMS = ["bar", "cucina", "dish", "swap"] as const;

export default function NavMenu({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainRoute = pathname.split("/")[1] || "";
  const searchParams = useSearchParams();
  const tab =
    (searchParams.get("tab") as (typeof NAV_ITEMS)[number]) || NAV_ITEMS[0];

  const STORAGE_KEY = useMemo(() => `nav-tab-${mainRoute}`, [mainRoute]);

  const router = useRouter();

  const activeTab = searchParams.get("tab") || NAV_ITEMS[0] || "";
  const urlMonth = searchParams.get("month");
  const [month, setMonth] = useState(
    () => urlMonth || MONTHS[new Date().getMonth()],
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMonth(urlMonth || MONTHS[new Date().getMonth()]);
  }, [pathname]);

  const onSyncParams = useEffectEvent((items: readonly string[], m: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const saved = localStorage.getItem(STORAGE_KEY);
    const resolvedTab = saved && items.includes(saved) ? saved : items[0];

    const currentTab = params.get("tab");
    const currentMonth = params.get("month");

    const tabSynced = currentTab === resolvedTab;
    const dateSynced = currentMonth === m;

    if (tabSynced && dateSynced) return;

    if (resolvedTab) {
      params.set("tab", resolvedTab);
    }
    +params.set("month", m);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  });

  useEffect(() => {
    onSyncParams(NAV_ITEMS, month);
  }, [STORAGE_KEY, month, pathname]);

  const handleTabChange = (value: string) => {
    localStorage.setItem(STORAGE_KEY, value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    // router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  };

  const currentMonthIndex = new Date().getMonth();

  const filteredMonths = [
    MONTHS[(currentMonthIndex - 1 + 12) % 12],
    MONTHS[currentMonthIndex],
    MONTHS[(currentMonthIndex + 1) % 12],
  ];

  const handlers = useSwipeable({
    delta: 50,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    onSwipedUp: () => {
      const currentIndex = NAV_ITEMS.indexOf(tab ?? "");
      const nextIndex = (currentIndex + 1) % NAV_ITEMS.length;
      const nextTab = NAV_ITEMS[nextIndex];
      handleTabChange(nextTab);
    },
    onSwipedDown: () => {
      const currentIndex = NAV_ITEMS.indexOf(tab ?? "");
      const prevIndex =
        (currentIndex - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
      const prevTab = NAV_ITEMS[prevIndex];
      handleTabChange(prevTab);
    },
  });

  return (
    <div {...handlers} className="flex h-screen flex-col justify-between">
      <div className="bg-background sticky top-2 z-20 my-2 flex justify-between px-4 md:gap-4">
        <div className="order-1 flex gap-4 md:order-0">
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
        </div>

        <div className="flex gap-8">
          <LogOutButton />
          <ThemesButton />
        </div>
      </div>

      <div className="flex flex-1 justify-center items-center h-full mt-auto">
        {children}
      </div>

      <div className="bg-background sticky bottom-2 z-20 flex items-center justify-center px-4 md:justify-start">
        <TabsOptions
          value={activeTab}
          setValue={handleTabChange}
          isPending={isPending}
          options={NAV_ITEMS}
        />
      </div>
    </div>
  );
}
