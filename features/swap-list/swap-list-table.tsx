import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { SHIFT_VALUES } from "./constants";
import { SwapActionType, updateSwapStatus } from "@/app/action/swap-action";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function SwapListTable({
  swapsList,
}: {
  swapsList: SwapActionType[];
}) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === "parhomenkogm@gmail.com";
  const reversedList = [...swapsList].reverse();
  return (
    <Table>
      <TableBody>
        {reversedList.map((swap) => {
          const IconComponent =
            SHIFT_VALUES[swap.typeSwap as keyof typeof SHIFT_VALUES];

          const isChecked = swap.isAccepted;
          return (
            <TableRow
              key={`swap-${swap.id}`}
              className={cn(
                "[&>td]:p-1 [&>td]:text-xs",
                isChecked && "bg-accent text-green-600!",
              )}
            >
              <TableCell className="text-blue-500">
                {swap.dateRegister
                  ? format(new Date(swap.dateRegister), "dd.MM HH:mm")
                  : "-"}
              </TableCell>
              <TableCell>
                {swap.employee1.split(" ")[0]}{" "}
                {swap.employee1.split(" ")[1]?.[0] || ""}
              </TableCell>
              <TableCell>
                {IconComponent ? (
                  <IconComponent className="h-3 w-3 text-red-500" />
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <span>
                  {swap.employee2.split(" ")[0]}{" "}
                  {swap.employee2.split(" ")[1]?.[0] || ""}
                </span>
              </TableCell>
              <TableCell>
                {swap.date ? format(new Date(swap.date), "dd.MM") : "-"}
              </TableCell>
              <TableCell>{swap.shift}</TableCell>
              <TableCell className="flex gap-2 items-center">
                <Checkbox
                  checked={swap.isAccepted ?? false}
                  onCheckedChange={async (checked) => {
                    const value = checked === true;

                    isAdmin &&
                      (await updateSwapStatus(
                        `${swap.year}-${swap.month}`,
                        swap.id,
                        value,
                      ));
                  }}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
