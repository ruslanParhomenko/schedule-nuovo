import { Suspense } from "react";
import ScheduleClient from "./schedule-client";
import { rowShiftsType } from "./model/type";

export default function SchedulePage({
  schedule,
}: {
  schedule: rowShiftsType[];
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleClient schedule={schedule} />
    </Suspense>
  );
}
