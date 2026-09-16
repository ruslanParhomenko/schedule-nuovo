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
  const getCached = unstable_cache(
    async () => {
      return scheduleCache.get(tab) || null;
    },
    [`schedule-${tab}`],
    { revalidate: false, tags: [`schedule-${tab}`] },
  );

  return getCached();
}

export async function setCachedSchedule(data: SyncScheduleData) {
  scheduleCache.set(data.tab, data);
  return data;
}
