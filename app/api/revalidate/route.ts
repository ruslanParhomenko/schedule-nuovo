import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // проверяем секрет, который хранится в Vercel env
  if (!body.secret || body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // ревалидируем тег
  revalidateTag("schedule");

  return NextResponse.json({ message: "Schedule tag revalidated" });
}
