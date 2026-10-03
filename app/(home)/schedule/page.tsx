import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import NotSchedule from "@/components/page/not-schedule";
import SchedulePage from "@/features/schedule/schedule-page";
import { getCachedSchedule } from "@/features/schedule/actions/get-schedule-data";

const ROLE_BY_SESSION = {
  barmen: "bar",
  waiters: "bar",
  cook: "cucina",
  dish: "dish",
  staff: "bar",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.role) {
    return <NotSchedule />;
  }

  const roleKey =
    ROLE_BY_SESSION[session.user?.role as keyof typeof ROLE_BY_SESSION];

  if (!roleKey) {
    return <NotSchedule />;
  }
  const { month } = await searchParams;
  const year = new Date().getFullYear().toString();

  if (!month || !year) {
    return <NotSchedule />;
  }

  const cachedSchedule = await getCachedSchedule({ year, month, roleKey });

  if (!cachedSchedule) {
    return <NotSchedule />;
  }

  return <SchedulePage schedule={cachedSchedule} />;
}
