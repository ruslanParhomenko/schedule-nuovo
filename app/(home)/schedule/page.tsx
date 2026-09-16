import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCachedSchedule } from "@/app/action/get-schedule-cache";
import NotSchedule from "@/components/page/not-schedule";
import SchedulePage from "@/features/schedule/schedule-page";

const ROLE_BY_SESSION = {
  barmen: "bar",
  waiters: "bar",
  cook: "cucina",
  dish: "dish",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <NotSchedule />;
  }

  const roleKey =
    ROLE_BY_SESSION[session.user?.role as keyof typeof ROLE_BY_SESSION];

  if (!roleKey) {
    return <NotSchedule />;
  }

  const cachedSchedule = await getCachedSchedule(roleKey);

  if (!cachedSchedule?.rowShifts) {
    return <NotSchedule />;
  }

  return <SchedulePage schedule={cachedSchedule.rowShifts} />;
}
