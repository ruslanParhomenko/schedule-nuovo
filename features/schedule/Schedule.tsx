"use client";

import { useEffect, useMemo, useState } from "react";

import { useForm, useWatch } from "react-hook-form";
import { Form } from "@/components/ui/form";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { useLocalStorageForm } from "@/hooks/useLocalStorageForm";
import {
  color,
  COLOR_SHIFT,
  ROLE_URL,
  SHIFT_OPTIONS,
  SHIFTS,
} from "./constants";
import { usePathname } from "next/navigation";
import { getMonthDays, MONTHS } from "@/utils/getMonthDays";
import ScheduleHeader from "./ScheduleHeader";
import SelectField from "./SelectField";

type rowSchiftsType = {
  id: string;
  dayHours: string;
  nightHours: string;
  totalHours: string;
  employee: string;
  role: string;
  rate: string;
  employeeId: string;
  shifts: string[];
};

export type ScheduleData = {
  id: string;
  year: string;
  month: string;
  role: string;
  rowShifts: rowSchiftsType[];
  uniqueKey: string;
};

export default function Schedule({ schedules }: { schedules: ScheduleData[] }) {
  const pathname = usePathname();

  const KEY_PREFIX = "schedule-data";

  // set local storage
  const { setValue, getValue } = useLocalStorageForm<any>(KEY_PREFIX);
  const selected = getValue();

  // form
  const currentYear = new Date().getFullYear().toString();
  const form = useForm({
    defaultValues: selected || { month: "", role: "", year: currentYear },
  });

  // state schedule
  const [schedule, setSchedule] = useState<ScheduleData | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  const month = useWatch({ control: form.control, name: "month" });
  const role = useWatch({ control: form.control, name: "role" });
  const year = useWatch({ control: form.control, name: "year" });

  // unique key
  const uniqueKey = useMemo(() => {
    return `${year}-${month}-${role}`;
  }, [month, year, role]);

  useEffect(() => {
    const found = schedules.find(
      (s: ScheduleData) => s.uniqueKey === uniqueKey
    );
    setSchedule(found || null);
  }, [uniqueKey]);

  const monthDays = useMemo(() => {
    if (!schedule?.month || !schedule?.year) return [];
    return getMonthDays({ month: schedule.month, year: schedule.year });
  }, [schedule]);

  useEffect(() => {
    setValue({ month, year, role });
  }, [month, setValue, year, role]);

  const YEAR = ["2025", "2026", "2027", "2028", "2029", "2030"];
  const ROLE = ["dish", "restaurant", "cucina"];

  const todayDay = new Date().getDate();
  const todayIndex = monthDays.findIndex((day) => day.day === todayDay);
  useEffect(() => {
    if (todayIndex !== -1) {
      setSelectedColumn(todayIndex);
    }
  }, [todayIndex]);

  return (
    <>
      <Form {...form}>
        <form className="flex  gap-1 items-center justify-between md:justify-start py-6 px-2">
          <SelectField
            fieldName="year"
            data={YEAR}
            placeHolder="year"
            className="w-30"
            disabled
          />
          <SelectField
            fieldName="month"
            data={MONTHS}
            placeHolder="month"
            className="w-30"
          />
          <SelectField
            fieldName="role"
            data={ROLE}
            placeHolder="role"
            className="w-30"
          />
        </form>
      </Form>
      {schedule && (
        <Table className="table-fixed">
          <ScheduleHeader
            monthDays={monthDays}
            setSelectedColumn={setSelectedColumn}
            month={schedule.month}
          />
          <TableBody>
            {schedule.rowShifts?.map((row, rowIndex) => {
              const isSelected = !["v", "s", ""].includes(
                row.shifts?.[selectedColumn as number]
              );

              return (
                <TableRow key={row.id} className="hover:text-rd">
                  <TableCell
                    className={cn(
                      "sticky left-0 bg-card text-muted-foreground w-36 p-2 h-11",
                      isSelected && "text-rd font-bold"
                    )}
                  >
                    {row.employee}
                  </TableCell>

                  {row.shifts?.map((day, dayIndex) => {
                    const isSelected = dayIndex === selectedColumn;

                    return (
                      <TableCell
                        key={dayIndex}
                        className={cn(
                          "p-0 w-10 text-center border-x",
                          color[day as keyof typeof color],
                          isSelected && "text-rd! font-bold"
                        )}
                      >
                        {["/", "v", "s"].includes(day) ? null : day}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
}
