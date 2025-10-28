import { getSchedule } from "@/app/action/getSchedule";
import Schedule, { ScheduleData } from "@/features/schedule/Schedule";

const Page = async () => {
  const schedule = await getSchedule();

  return <Schedule schedules={schedule as ScheduleData[]} />;
};

export default Page;
