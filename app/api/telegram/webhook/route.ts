import { NextRequest, NextResponse } from "next/server";

import { revalidateTag } from "next/cache";
import { setCachedSchedule } from "@/app/action/get-schedule-cache";

type ShiftRow = {
  employee: string;
  employeeId: string;
  shifts: string[];
};

type SyncScheduleData = {
  tab: string;
  rowShifts: ShiftRow[];
};

export async function POST(request: NextRequest) {
  const update = await request.json();
  const text = update?.message?.text;

  if (!text) {
    return NextResponse.json({ ok: true });
  }

  try {
    const data = JSON.parse(text) as SyncScheduleData;

    if (!data.tab || !Array.isArray(data.rowShifts)) {
      return NextResponse.json({ ok: true });
    }

    await setCachedSchedule(data);

    revalidateTag(`schedule-${data.tab}`, "max");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}
