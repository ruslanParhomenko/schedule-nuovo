// app/api/schedule/route.ts
import { db } from "@/lib/firebase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  if (!month || !year) {
    return new Response("Missing params", { status: 400 });
  }

  const collectionRef = db
    .collection("schedule-new")
    .doc(year)
    .collection("months")
    .doc(month)
    .collection("role");

  const snap = await collectionRef.get();

  if (snap.empty) {
    return Response.json([]);
  }

  const data = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return Response.json(data);
}
