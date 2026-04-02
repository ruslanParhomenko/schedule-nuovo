"use client";

import { createSwap } from "@/app/action/swap-action";
import { DatePInput } from "@/components/calendar/date-input";
import SelectInput from "@/components/select/select-input";

import { Session } from "next-auth";
import { useActionState } from "react";
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
  swapsList: any[];
  session: Session | null;
}) {
  console.log("swapsList:", swapsList);
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
    <div className="flex flex-col w-full items-center p-1 h-screen justify-center">
      {swapsList.length > 0 && (
        <div className="w-full max-w-4xl h-[33vh] overflow-y-auto">
          <SwapListTable swapsList={swapsList} />
        </div>
      )}
      <form
        action={formAction}
        onSubmit={(e) => {
          const formData = new FormData(e.currentTarget);
          console.log(formData);

          for (const [key, value] of formData.entries()) {
            console.log(key, value);
          }
        }}
        className="flex flex-col gap-4 w-full px-2 md:w-1/2 md:items-center"
      >
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
        <input type="hidden" name="dateRegister" value={now.toISOString()} />
        <input type="hidden" name="year" value={defaultYear} />
        <input type="hidden" name="month" value={defaultMonth} />
        <button
          type="submit"
          disabled={pending}
          className={`py-2 px-4 rounded-md text-white transition-colors md:w-64 ${
            pending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {pending ? "Отправка..." : "Поменять смены"}
        </button>
        {state?.message && (
          <p
            className={`mt-2 ${state.error ? "text-red-500" : "text-green-500"}`}
          >
            {state.message}
          </p>
        )}

        <div className="mt-auto sticky bottom-2  flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.replace("/schedule")}
          >
            выход
          </Button>
        </div>
      </form>
    </div>
  );
}
