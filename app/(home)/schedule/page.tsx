import { getEmployees } from "@/app/action/getEmployee";
import { getSchedule } from "@/app/action/getSchedule";
import Schedule, { ScheduleData } from "@/features/schedule/Schedule";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
  const schedule = await getSchedule();
  const employees = await getEmployees();
  const session = await getServerSession(authOptions);

  return (
    <Schedule
      schedules={schedule as ScheduleData[]}
      session={session}
      employees={employees}
    />
  );
};

export default Page;
