"use client";
import { getMonthDays, MonthDayType } from "@/utils/get-month-days";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function ScheduleHeader({
  selectedColumn,
  setSelectedColumn,
  isFooter,
}: {
  selectedColumn: number;
  setSelectedColumn?: (index: number) => void;
  isFooter?: boolean;
}) {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const nowDay = new Date();
  const todayDay = nowDay.getDate();
  const year = nowDay.getFullYear();

  const monthDays = getMonthDays({ month: month!, year: year.toString() });

  const minIndex = Math.max(0, todayDay - 2);
  const maxIndex = Math.min(monthDays.length - 1, todayDay + 4);

  return (
    <TableBody>
      <TableRow
        className={cn(
          "border-bl/30 border-0!",
          isFooter ? "border-t!" : "border-b!",
        )}
      >
        <TableCell className="w-26 front-bold text-center sticky left-0 bg-background text-bl">
          {isFooter ? "" : month?.slice(0, 3) || ""}
        </TableCell>
        {monthDays
          .filter((_, index) => index >= minIndex && index <= maxIndex)
          .map((day, index) => {
            return (
              <TableCell
                key={day.day}
                className={cn(
                  "w-10 cursor-pointer p-0   text-bl",
                  day.day === selectedColumn && "text-rd! front-bold",
                )}
                onClick={() => setSelectedColumn && setSelectedColumn(day.day)}
              >
                <div className="text-sm font-semibold text-center">
                  {day.day}
                </div>
                <div className="text-xs text-muted-bl text-center">
                  {day.weekday}
                </div>
              </TableCell>
            );
          })}
      </TableRow>
    </TableBody>
  );
}
