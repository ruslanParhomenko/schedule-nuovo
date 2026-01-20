// app/api/schedule/route.ts
import { db } from "@/lib/firebase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  if (!month || !year) return new Response("Missing params", { status: 400 });

  const snapshot = await db
    .collection("schedule")
    .where("month", "==", month)
    .where("year", "==", year)
    .get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return Response.json(data);
}
