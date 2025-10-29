"use client";

import { useEffect, useMemo, useState } from "react";

import { useForm, useWatch } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { useLocalStorageForm } from "@/hooks/useLocalStorageForm";
import { color } from "./constants";
import { getMonthDays, MONTHS } from "@/utils/getMonthDays";
import ScheduleHeader from "./ScheduleHeader";
import SelectField from "./SelectField";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

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

export default function Schedule({
  schedules,
  session,
  employees,
}: {
  schedules: ScheduleData[];
  session: any;
  employees: any[];
}) {
  const nameNonAuth = session?.user?.name || "";
  const email = session?.user?.email || "";
  const name = employees.find((e) => e.email === email)?.name || "";
  const isAuth = employees.find((e) => e.email === email) || false;
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
  }, [uniqueKey, schedules]);

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

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);
  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, [schedule]);

  const buttonWidth = schedule ? "w-20" : "w-40";

  const handleReset = () => {
    form.reset({ month: "", role: "", year: currentYear });
    setSelectedColumn(todayIndex !== -1 ? todayIndex : null);
  };

  return (
    <>
      <Form {...form}>
        <form
          className={cn(
            "transform transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-0"
          )}
        >
          <div
            className={cn(
              schedule
                ? "flex flex-row sm:flex-row py-4 gap-2 justify-between items-center px-4"
                : "flex flex-col items-center gap-10 justify-center h-screen"
            )}
          >
            {!name && nameNonAuth && (
              <Label className="text-rd text-center">
                Привет {nameNonAuth.split(" ")[0]} просьба отправить свою почту
                для получения расписания
              </Label>
            )}
            {!schedule && name && (
              <Label className="text-3xl text-bl">
                Привет {name.split(" ")[0]}
              </Label>
            )}
            <SelectField
              fieldName="year"
              data={YEAR}
              placeHolder="year"
              className={buttonWidth}
              disabled
            />
            <SelectField
              fieldName="month"
              data={MONTHS}
              placeHolder="month"
              className={buttonWidth}
            />
            <SelectField
              fieldName="role"
              data={ROLE}
              placeHolder="role"
              className={buttonWidth}
              disabled={!isAuth}
            />
            <Button className={buttonWidth} onClick={handleReset} type="button">
              reset
            </Button>
          </div>
        </form>
      </Form>
      {schedule && isAuth && (
        <div
          className={cn(
            "overflow-x-auto transform transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          )}
        >
          <Table className="table-fixed min-w-full">
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
                        "sticky left-0 bg-card text-muted-foreground p-2 h-9 z-10 truncate",
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
                            "p-0  text-center border-x transition-colors duration-500",
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
            <ScheduleHeader
              monthDays={monthDays}
              setSelectedColumn={setSelectedColumn}
              month={schedule.month}
              isFooter={true}
            />
          </Table>
        </div>
      )}
    </>
  );
}
