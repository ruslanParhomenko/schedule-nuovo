"use server";

import { SCHEDULE_ACTION_TAG } from "@/constants/actions-tags";
import { db } from "@/lib/firebase";
import { unstable_cache } from "next/cache";
import { rowShiftsType, ScheduleData } from "../model/type";

const actionTag = SCHEDULE_ACTION_TAG;

interface Props {
  year: string;
  month: string;
  roleKey: string;
}

export async function _getScheduleData({
  year,
  month,
  roleKey,
}: Props): Promise<ScheduleData["rowShifts"]> {
  const snap = await db
    .collection(actionTag)
    .doc(year)
    .collection("months")
    .doc(month)
    .collection("role")
    .doc(roleKey)
    .get();

  if (!snap.exists) {
    return [];
  }

  const data = snap.data() as { rowShifts?: rowShiftsType[] } | undefined;
  return data?.rowShifts ?? [];
}

export const getCachedSchedule = unstable_cache(_getScheduleData, [actionTag], {
  revalidate: false,
  tags: [actionTag],
});
