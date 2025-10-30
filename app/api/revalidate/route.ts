import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const secret = process.env.REVALIDATE_SECRET!;

  if (!body.secret || body.secret !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!body.tag) {
    return NextResponse.json({ message: "Tag required" }, { status: 400 });
  }
  //@ts-ignore
  revalidateTag(body.tag, "max");

  return NextResponse.json({ message: `Tag ${body.tag} revalidated` });
}
