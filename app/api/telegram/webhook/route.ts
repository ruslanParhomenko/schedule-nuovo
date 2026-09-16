import { NextRequest, NextResponse } from "next/server";
import { setCachedSchedule } from "@/app/action/get-schedule-cache";

export async function POST(request: NextRequest) {
  try {
    const update = await request.json();

    const text = update?.message?.text;

    if (!text) {
      return NextResponse.json({ ok: true });
    }

    const data = JSON.parse(text);

    if (!data.tab || !Array.isArray(data.rowShifts)) {
      return NextResponse.json({ ok: true });
    }

    await setCachedSchedule(data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: true });
  }
}
