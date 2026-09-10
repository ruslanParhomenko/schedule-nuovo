import { Suspense } from "react";
import ScheduleClient from "./schedule-client";
import { ScheduleData } from "@/app/action/get-schedule";

export default function SchedulePage({
  schedule,
}: {
  schedule: ScheduleData | null;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleClient schedule={schedule} />
    </Suspense>
  );
}
