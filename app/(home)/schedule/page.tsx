import { getCachedSchedule } from "@/app/action/get-schedule-cache";
import NotSchedule from "@/components/page/not-schedule";
import SchedulePage from "@/features/schedule/schedule-page";

const ROLE_BY_SESSION = {
  barmen: "bar",
  waiters: "bar",
  cook: "cucina",
  dish: "dish",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const headers = new Headers();

  const role = headers.get("role");

  const roleKey = ROLE_BY_SESSION[role as keyof typeof ROLE_BY_SESSION];

  const cachedSchedule = await getCachedSchedule(roleKey);
  const schedule = cachedSchedule?.rowShifts;

  console.log("schedule", schedule);

  if (!schedule) {
    // return <NotAuth name={session?.user?.name!} />;
    return <NotSchedule />;
  }

  return <SchedulePage schedule={schedule} />;
}
