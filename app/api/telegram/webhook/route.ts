// app/api/telegram/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { setCachedSchedule } from "@/app/action/get-schedule-cache";
import { revalidateTag } from "next/cache";

type SyncScheduleData = {
  tab: string;
  rowShifts: Array<{
    employee: string;
    employeeId: string;
    shifts: string[];
  }>;
};

export async function POST(request: NextRequest) {
  console.log("🔔 Webhook received at:", new Date().toISOString());

  try {
    const update = await request.json();
    const text = update?.message?.text;

    console.log("📝 Message text:", text?.substring(0, 100) || "empty");

    if (!text) {
      console.log("⚠️ No text in message");
      return NextResponse.json({ ok: true });
    }

    const data = JSON.parse(text) as SyncScheduleData;

    if (!data.tab || !Array.isArray(data.rowShifts)) {
      console.log("⚠️ Invalid data structure");
      return NextResponse.json({ ok: true });
    }

    await setCachedSchedule(data);
    revalidateTag(`schedule-${data.tab}`, "max");

    console.log("✅ SUCCESS: Schedule synced for tab:", data.tab);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ ok: true });
  }
}
