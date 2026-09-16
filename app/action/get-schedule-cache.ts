// app/action/get-schedule-cache.ts
"use server";

import { unstable_cache, revalidateTag } from "next/cache";

type SyncScheduleData = {
  tab: string;
  rowShifts: Array<{
    employee: string;
    employeeId: string;
    shifts: string[];
  }>;
};

// Переменная на уровне модуля
let scheduleData: SyncScheduleData | null = null;

// Кешируем функцию получения
const getScheduleFromMemory = unstable_cache(
  async (tab: string) => {
    console.log("🔍 [CACHE] Looking for tab:", tab);
    if (scheduleData?.tab === tab) {
      console.log("✅ [CACHE] Found:", scheduleData.rowShifts.length, "rows");
      return scheduleData;
    }
    console.log("❌ [CACHE] Not found");
    return null;
  },
  ["get-schedule"],
  { revalidate: 3600, tags: ["schedule-data"] },
);

export async function getCachedSchedule(tab: string) {
  return getScheduleFromMemory(tab);
}

export async function setCachedSchedule(data: SyncScheduleData) {
  console.log(
    "💾 [CACHE] Storing tab:",
    data.tab,
    "rows:",
    data.rowShifts.length,
  );
  scheduleData = data;
  revalidateTag("schedule-data", "max");
}
