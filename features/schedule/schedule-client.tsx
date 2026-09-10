"use client";

import { useState } from "react";
import { Table } from "@/components/ui/table";
import ScheduleHeader from "./schedule-header";
import { ScheduleData } from "@/app/action/get-schedule";
import ScheduleBody from "./schedule-body";
import NotSchedule from "@/components/page/not-schedule";

export default function ScheduleClient({
  schedule,
}: {
  schedule: ScheduleData | null;
}) {
  const todayDay = new Date().getDate();

  const [selectedColumn, setSelectedColumn] = useState<number>(todayDay);

  if (!schedule) return <NotSchedule />;

  return (
    <Table className="table-fixed min-w-full opacity-100 translate-y-0">
      <ScheduleHeader
        setSelectedColumn={setSelectedColumn}
        selectedColumn={selectedColumn}
      />
      <ScheduleBody schedule={schedule} selectedColumn={selectedColumn} />
      <ScheduleHeader selectedColumn={selectedColumn} isFooter={true} />
    </Table>
  );
}
