import { MonthDayType } from "@/utils/getMonthDays";
import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function ScheduleHeader({
  monthDays,
  setSelectedColumn,
  month,
  isFooter,
}: {
  monthDays: MonthDayType[];
  setSelectedColumn?: (index: number) => void;
  month?: string;
  isFooter?: boolean;
}) {
  const todayDay = new Date().getDate();

  return (
    <TableHeader>
      <TableRow className="border-bl/30">
        <TableCell className="w-28 p-0 front-bold text-center sticky left-0 bg-card text-bl">
          {isFooter ? "" : month?.toUpperCase() || ""}
        </TableCell>
        {monthDays.map((day, index) => {
          return (
            <TableCell
              key={day.day}
              className={cn(
                "w-7 cursor-pointer p-0  bg-card text-bl",
                day.day === todayDay && "text-rd! front-bold"
              )}
              onClick={() => setSelectedColumn && setSelectedColumn(index)}
            >
              <div className="text-sm font-semibold text-center">{day.day}</div>
              <div className="text-xs text-muted-bl text-center">
                {day.weekday}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
