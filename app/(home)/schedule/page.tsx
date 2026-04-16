import { getEmployees } from "@/app/action/get-employee";
import { getScheduleByMonthYear } from "@/app/action/get-schedule";
import { getUsers } from "@/app/action/get-user";
import NotAuth from "@/components/page/not-auth";
import NotSchedule from "@/components/page/not-schedule";
import Schedule from "@/features/schedule/schedule-page";
import { authOptions } from "@/lib/auth";
import { getMonthDays } from "@/utils/get-month-days";
import { getServerSession } from "next-auth";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const session = await getServerSession(authOptions);
  const employees = (await getEmployees()) as {
    id: string;
    name: string;
    role: string;
    mail: string;
  }[];

  const users = (await getUsers()) as {
    id: string;
    role: string;
    mail: string;
  }[];

  const adminMail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(",") || [];
  const isAuth =
    employees.map((e) => e.mail).includes(session?.user?.email!) ||
    users.map((u) => u.mail).includes(session?.user?.email!) ||
    adminMail.includes(session?.user?.email!) ||
    false;

  if (!isAuth) {
    return <NotAuth name={session?.user?.name!} />;
  }
  const { month } = await searchParams;

  if (!month) return null;

  const year = new Date().getFullYear().toString();
  const schedule = await getScheduleByMonthYear(month, year);
  const monthDays = getMonthDays({ month: month, year: year });

  return schedule ? (
    <Schedule schedules={schedule} monthDays={monthDays} month={month} />
  ) : (
    <NotSchedule />
  );
}
