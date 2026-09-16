"use client";

import { useState } from "react";
import { Table } from "@/components/ui/table";
import ScheduleHeader from "./schedule-header";
import ScheduleBody from "./schedule-body";
import { rowShiftsType } from "./model/type";

export default function ScheduleClient({
  schedule,
}: {
  schedule: rowShiftsType[];
}) {
  const todayDay = new Date().getDate();

  const [selectedColumn, setSelectedColumn] = useState<number>(todayDay);

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
