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

        return (
          <TableRow key={row.id} className="hover:text-rd border-bl/30 ">
            <TableCell
              className={cn(
                "sticky left-0 bg-background text-bl p-2 h-8 z-10 truncate text-xs",
                isSelected && "text-rd font-bold",
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
                    isSelected && "text-rd! font-bold",
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
  );
}
