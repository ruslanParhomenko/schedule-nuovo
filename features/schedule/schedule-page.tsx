import { Suspense } from "react";
import ScheduleClient from "./schedule-client";

export default function SchedulePage(props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleClient {...props} />
    </Suspense>
  );
}
