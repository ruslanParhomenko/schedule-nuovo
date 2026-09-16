// app/api/telegram/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { setCachedSchedule } from "@/app/action/get-schedule-cache";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  console.log("🔔 [WEBHOOK] Request received");

  try {
    const update = await request.json();
    console.log(
      "🔔 [WEBHOOK] Parsed JSON:",
      JSON.stringify(update).substring(0, 100),
    );

    const text = update?.message?.text;
    console.log(
      "🔔 [WEBHOOK] Message text:",
      text?.substring(0, 100) || "empty",
    );

    if (!text) {
      console.log("⚠️ [WEBHOOK] No text in message");
      return NextResponse.json({ ok: true });
    }

    const data = JSON.parse(text);
    console.log(
      "🔔 [WEBHOOK] Parsed data - tab:",
      data.tab,
      "rows:",
      data.rowShifts?.length,
    );

    if (!data.tab || !Array.isArray(data.rowShifts)) {
      console.log("⚠️ [WEBHOOK] Invalid structure");
      return NextResponse.json({ ok: true });
    }

    await setCachedSchedule(data);
    console.log("✅ [WEBHOOK] Data cached for tab:", data.tab);

    revalidateTag(`schedule-${data.tab}`, "max");
    console.log("✅ [WEBHOOK] Cache tag revalidated");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ [WEBHOOK] Error:", error);
    return NextResponse.json({ ok: true });
  }
}
