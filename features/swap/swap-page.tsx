"use client";

import { createSwap, SwapActionType } from "@/app/action/swap-action";
import { DatePInput } from "@/components/calendar/date-input";
import SelectInput from "@/components/select/select-input";

import { Session } from "next-auth";
import { useActionState, ViewTransition } from "react";
import { SHIFT_ACTIONS, SHIFTS_VALUES } from "./constants";
import SwapListTable from "../swap-list/swap-list-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/dist/client/components/navigation";

export default function SwapPage({
  employees,
  swapsList,
  session,
}: {
  employees: { id: string; name: string; role: string; mail: string }[];
  swapsList: SwapActionType[];
  session: Session | null;
}) {
  const router = useRouter();
  const userRole = employees.find(
    (emp) => emp.mail === (session?.user?.email as string),
  )?.role;
  const userName = employees.find(
    (emp) => emp.mail === (session?.user?.email as string),
  )?.name;

  const initialState = { message: "", error: false };
  const [state, formAction, pending] = useActionState(createSwap, initialState);

  const now = new Date();
  const defaultYear = String(now.getFullYear());
  const defaultMonth = now.getMonth() + 1;
  const optionsEmployees = employees
    .filter((emp) => ["waiters", "barmen"].includes(emp.role))
    .map((emp) => ({ value: emp.name, label: emp.name }));

  return (
    <ViewTransition>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-start h-[90vh] w-full md:px-4 px-2">
        <div className="md:h-full h-[50vh] overflow-hidden flex md:px-4">
          <SwapListTable swapsList={swapsList} />
        </div>
        <div className="flex-1 sticky top-0 md:px-4">
          <form action={formAction} className="space-y-6">
            <SelectInput
              options={SHIFT_ACTIONS}
              name="typeSwap"
              placeholder="тип изменения"
            />
            <SelectInput
              options={optionsEmployees}
              name="employee2"
              placeholder="выберите сотрудника"
            />
            <SelectInput
              options={SHIFTS_VALUES}
              name="shift"
              placeholder="выберите смену"
            />
            <DatePInput />
            <input name="employee1" type="hidden" value={userName} />
            <input type="hidden" name="role" value={userRole} />
            <input
              type="hidden"
              name="dateRegister"
              value={now.toISOString()}
            />
            <input type="hidden" name="year" value={defaultYear} />
            <input type="hidden" name="month" value={defaultMonth} />

            <div className="mt-auto sticky bottom-2  flex justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={() => router.replace("/schedule")}
                className="w-32"
              >
                выход
              </Button>
              <Button
                type="submit"
                variant="default"
                disabled={pending}
                className={`py-2 px-4 rounded-md text-white transition-colors md:w-32 ${
                  pending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {pending ? "Отправка..." : "Поменять смены"}
              </Button>
            </div>
            {state?.message && (
              <p
                className={`mt-2 w-full text-center ${state.error ? "text-red-500" : "text-green-500"}`}
              >
                {state.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </ViewTransition>
  );
}
