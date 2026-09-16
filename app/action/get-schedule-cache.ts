"use server";

import { unstable_cache, updateTag } from "next/cache";

type SyncScheduleData = {
  tab: string;
  rowShifts: Array<{
    employee: string;
    employeeId: string;
    shifts: string[];
  }>;
};

let scheduleData: SyncScheduleData | null = null;

const getScheduleFromMemory = unstable_cache(
  async () => {
    return scheduleData;
  },
  ["get-schedule"],
  { revalidate: false, tags: ["schedule-data"] },
);

export async function getCachedSchedule() {
  return getScheduleFromMemory();
}

export async function setCachedSchedule(data: SyncScheduleData) {
  scheduleData = data;
  updateTag("schedule-data");
}
