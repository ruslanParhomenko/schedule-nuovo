import { getEmployees } from "@/app/action/get-employee";
import {
  getScheduleByMonthYear,
  ScheduleData,
} from "@/app/action/get-schedule";
import NotAuth from "@/components/page/not-auth";
import NotSchedule from "@/components/page/not-schedule";
import Schedule from "@/features/schedule/schedule-page";
import { authOptions } from "@/lib/auth";
import { getMonthDays } from "@/utils/get-month-days";
import { getServerSession } from "next-auth";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ patch: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const session = await getServerSession(authOptions);
  const employees = (await getEmployees()) as {
    id: string;
    name: string;
    role: string;
    mail: string;
  }[];

  const adminMail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(",") || [];
  const isAuth =
    employees.map((e) => e.mail).includes(session?.user?.email!) ||
    adminMail.includes(session?.user?.email!) ||
    false;

  if (!isAuth) {
    return <NotAuth name={session?.user?.name!} />;
  }
  const { patch } = await params;
  const { month, year } = await searchParams;

  if (!month || !year) return null;
  const schedule = (await getScheduleByMonthYear(month, year)).find(
    (s: any) => s.role === patch,
  );
  const monthDays = getMonthDays({ month: month, year: year });

  return schedule ? (
    <Schedule
      schedule={schedule as ScheduleData}
      monthDays={monthDays}
      month={month}
    />
  ) : (
    <NotSchedule />
  );
}
