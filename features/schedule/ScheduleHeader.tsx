import { MonthDayType } from "@/utils/getMonthDays";
import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function ScheduleHeader({
  monthDays,
  setSelectedColumn,
  month,
}: {
  monthDays: MonthDayType[];
  setSelectedColumn?: (index: number) => void;
  month?: string;
}) {
  const todayDay = new Date().getDate();

  return (
    <TableHeader>
      <TableRow>
        <TableCell className="w-36 p-0 front-bold text-center sticky left-0 bg-card">
          {month?.toUpperCase() || ""}
        </TableCell>
        {monthDays.map((day, index) => {
          return (
            <TableCell
              key={day.day}
              className={cn(
                "w-10 cursor-pointer p-0",
                day.day === todayDay && "text-rd front-bold"
              )}
              onClick={() => setSelectedColumn && setSelectedColumn(index)}
            >
              <div className="text-sm font-semibold text-center">{day.day}</div>
              <div className="text-xs text-muted-foreground text-center">
                {day.weekday}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
