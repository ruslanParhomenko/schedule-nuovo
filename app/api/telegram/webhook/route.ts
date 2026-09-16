import { setCachedSchedule } from "@/app/action/get-schedule-cache";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// app/api/telegram/webhook/route.ts
export async function POST(request: NextRequest) {
  const update = await request.json();
  const text = update?.message?.text;

  if (!text) return NextResponse.json({ ok: true });

  try {
    const data = JSON.parse(text);
    await setCachedSchedule(data);
    revalidateTag(`schedule-${data.tab}`, "max");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
