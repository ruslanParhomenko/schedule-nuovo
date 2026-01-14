"use client";

import { useEffect, useState } from "react";
import { Table } from "@/components/ui/table";
import { getMonthDays } from "@/utils/get-month-days";
import ScheduleHeader from "./schedule-header";
import { ScheduleData } from "@/app/action/get-schedule";
import ScheduleBody from "./schedule-body";
import { ViewTransition } from "react";

export default function Schedule({
  schedule,
  monthDays,
  month,
}: {
  schedule: ScheduleData;
  monthDays: ReturnType<typeof getMonthDays>;
  month: string;
}) {
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  const todayDay = new Date().getDate();
  const todayIndex = monthDays.findIndex((day) => day.day === todayDay);
  useEffect(() => {
    if (todayIndex !== -1) {
      setSelectedColumn(todayIndex);
    }
  }, [todayIndex]);

  return (
    <ViewTransition>
      <Table className="table-fixed min-w-full opacity-100 translate-y-0">
        <ScheduleHeader
          monthDays={monthDays}
          setSelectedColumn={setSelectedColumn}
          month={month}
        />
        <ScheduleBody
          schedule={schedule}
          selectedColumn={selectedColumn || 0}
        />

        <ScheduleHeader
          monthDays={monthDays}
          setSelectedColumn={setSelectedColumn}
          month={month}
          isFooter={true}
        />
      </Table>
    </ViewTransition>
  );
}
