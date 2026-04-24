"use client";

import { useEffect, useState } from "react";
import { Table } from "@/components/ui/table";
import { getMonthDays } from "@/utils/get-month-days";
import ScheduleHeader from "./schedule-header";
import { ScheduleData } from "@/app/action/get-schedule";
import ScheduleBody from "./schedule-body";
import { ViewTransition } from "react";
import { useHashParam } from "@/hooks/use-hash";
import SwapPage from "../swap/swap-page";
import { SwapActionType } from "@/app/action/swap-action";
import { Session } from "next-auth";

export default function Schedule({
  schedules,
  monthDays,
  month,
  employees,
  swapsList,
  session,
}: {
  schedules: ScheduleData[];
  monthDays: ReturnType<typeof getMonthDays>;
  month: string;
  employees: { id: string; name: string; role: string; mail: string }[];
  swapsList: SwapActionType[];
  session: Session | null;
}) {
  const [value] = useHashParam("tab");
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  const todayDay = new Date().getDate();
  const todayIndex = monthDays.findIndex((day) => day.day === todayDay);
  useEffect(() => {
    if (todayIndex !== -1) {
      setSelectedColumn(todayIndex);
    }
  }, [todayIndex]);

  if (!value) return null;

  const schedule =
    schedules.find((schedule) => schedule.role === value) || null;

  return (
    <ViewTransition>
      {value === "swap" ? (
        <SwapPage
          employees={employees}
          session={session}
          swapsList={swapsList}
        />
      ) : (
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
      )}
    </ViewTransition>
  );
}
