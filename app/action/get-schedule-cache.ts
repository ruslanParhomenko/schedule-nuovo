"use server";

import { unstable_cache } from "next/cache";

type SyncScheduleData = {
  tab: string;
  rowShifts: Array<{
    employee: string;
    employeeId: string;
    shifts: string[];
  }>;
};

let scheduleCache: Map<string, SyncScheduleData> = new Map();

export async function getCachedSchedule(tab: string) {
  console.log("🔍 [CACHE] Looking for tab:", tab);

  const getCached = unstable_cache(
    async () => {
      const result = scheduleCache.get(tab);
      console.log(
        "🔍 [CACHE] Found:",
        result ? `${result.rowShifts.length} rows` : "null",
      );
      return result || null;
    },
    [`schedule-${tab}`],
    { revalidate: 3600, tags: [`schedule-${tab}`] },
  );

  return getCached();
}

export async function setCachedSchedule(data: SyncScheduleData) {
  console.log(
    "💾 [CACHE] Storing tab:",
    data.tab,
    "rows:",
    data.rowShifts.length,
  );
  scheduleCache.set(data.tab, data);
  return data;
}
