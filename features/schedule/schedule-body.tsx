import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { color } from "./constants";
import { ScheduleData } from "@/app/action/get-schedule";

export default function ScheduleBody({
  schedule,
  selectedColumn,
}: {
  schedule: ScheduleData | null;
  selectedColumn: number;
}) {
  return (
    <TableBody>
      {schedule?.rowShifts?.map((row) => {
        const isSelected = !["v", "s", ""].includes(
          row.shifts?.[selectedColumn as number],
        );

        const todayDay = new Date().getDate();
        const minIndex = Math.max(0, todayDay - 4);
        const maxIndex = Math.min(row.shifts.length - 1, todayDay + 4);
        return (
          <TableRow key={row.id} className="hover:text-rd border-bl/30 ">
            <TableCell
              className={cn(
                "sticky left-0 bg-background text-bl p-2 h-8 z-10 truncate text-xs",
                isSelected && "text-rd font-bold",
              )}
            >
              {row.employee.split(" ")[1]} {row.employee.split(" ")[0][0]}
            </TableCell>

            {row.shifts
              ?.filter((_, index) => index >= minIndex && index <= maxIndex)
              .map((day, dayIndex) => {
                const isSelected = dayIndex === selectedColumn;

                return (
                  <TableCell
                    key={dayIndex}
                    className={cn(
                      "p-0  text-center border-x transition-colors duration-500",
                      color[day as keyof typeof color],
                      isSelected && "text-rd! font-bold",
                    )}
                  >
                    {["/", "v", "s", "u"].includes(day) ? null : day}
                  </TableCell>
                );
              })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
