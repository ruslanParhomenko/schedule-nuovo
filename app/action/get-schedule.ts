"use server";

import { db } from "@/lib/firebase";
import { unstable_cache } from "next/cache";

//type
type rowShiftsType = {
  id: string;
  dayHours: string;
  nightHours: string;
  totalHours: string;
  employee: string;
  role: string;
  rate: string;
  employeeId: string;
  shifts: string[];
};

export type ScheduleData = {
  id: string;
  year: string;
  month: string;
  role: string;
  rowShifts: rowShiftsType[];
  uniqueKey: string;
};

// get by filters
export const _getScheduleByMonthYear = async (month: string, year: string) => {
  const snapshot = await db
    .collection("schedule")
    .where("month", "==", month)
    .where("year", "==", year)
    .get();

  if (snapshot.empty) return [];

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ScheduleData[];
};

export const getScheduleByMonthYear = unstable_cache(
  _getScheduleByMonthYear,
  ["schedule"],
  {
    revalidate: false,
    tags: ["schedule"],
  }
);
