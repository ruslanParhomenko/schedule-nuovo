"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSwipeable } from "react-swipeable";
import { TabsLine } from "../ui/tabs-line";
import { INITIAL_LINE_ITEM, NAV_LINE_ITEMS } from "./constants";

export default function NavFooter() {
  const pathname = usePathname();
  const mainRoute = pathname.split("/")[1] || "";
  const searchParams = useSearchParams();
  const initialTab = mainRoute || INITIAL_LINE_ITEM;

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    startTransition(() => {
      router.replace(`${value}?${params.toString()}`, { scroll: false });
    });
  };

  const handlers = useSwipeable({
    delta: 50,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    onSwipedLeft: () => {
      handleTabChange(NAV_LINE_ITEMS[1]);
    },
    onSwipedRight: () => {
      handleTabChange(NAV_LINE_ITEMS[0]);
    },
  });

  return (
    <div
      {...handlers}
      className="bg-background sticky bottom-2 z-20 flex items-center justify-center px-4 md:justify-start"
    >
      <TabsLine
        value={initialTab}
        onChange={(value: string) => handleTabChange(value)}
        disabled={isPending}
        options={NAV_LINE_ITEMS}
      />
    </div>
  );
}
