import { getEmployees } from "@/app/action/get-employee";
import { getScheduleByMonthYear } from "@/app/action/get-schedule";
import NotSchedule from "@/components/page/not-schedule";
import SchedulePage from "@/features/schedule/schedule-page";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const ADMIN_ROLE = process.env.NEXT_PUBLIC_ADMIN_ROLE;
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
  const session = await getServerSession(authOptions);
  const employees = await getEmployees();

  const isAdmin =
    employees.find((e) => e.mail === session?.user?.email!)?.role ===
    ADMIN_ROLE;

  // const isAuth =
  //   employees
  //     .filter((e) => e.status === "active")
  //     .map((e) => e.mail)
  //     .includes(session?.user?.email!) || isAdmin;

  const roleUserBySession = session?.user?.role;

  if (!isAdmin) {
    // return <NotAuth name={session?.user?.name!} />;
    return <NotSchedule />;
  }
  const { month } = await searchParams;

  if (!month) return null;

  const year = new Date().getFullYear().toString();

  const schedules = await getScheduleByMonthYear(month, year);
  const schedule =
    schedules.find(
      (schedule) =>
        schedule.id ===
        ROLE_BY_SESSION[roleUserBySession as keyof typeof ROLE_BY_SESSION],
    ) || null;

  return <SchedulePage schedule={schedule} />;
}
