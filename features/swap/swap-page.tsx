"use client";

import { createSwap } from "@/app/action/swap-action";
import { DatePicker } from "@/components/calendar/date-input";
import { Session } from "next-auth";
import { useActionState, useState } from "react";

const SHIFTS = ["08:00", "09:00", "14:00", "18:00", "20:00"];

export default function SwapPage({
  employees,
  swapsList,
  session,
}: {
  employees: { id: string; name: string; role: string; mail: string }[];
  swapsList: any[]; // Replace 'any[]' with the actual type if available
  session: Session | null;
}) {
  console.log("swapsList", swapsList);
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
  const defaultMonth = now.toLocaleString("default", { month: "long" });

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {swapsList.length > 0 && (
        <div className="mb-6 w-full max-w-md">
          <ul className="space-y-2">
            {swapsList.map((swap) => (
              <li key={`swap-${swap.id}`} className="border p-2 rounded-md">
                <p className="text-sm">
                  {`${swap.dateRegister.split("T")[0]} : ${swap.employee1} => ${swap.employee2}- ${swap.date?.split("T")[0]} \ ${swap.shift}`}
                </p>
              </li>
            ))}
          </ul>
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
        className="flex flex-col gap-4"
      >
        <input type="text" name="role" value={userRole} readOnly />
        <input
          name="employee1"
          type="text"
          value={userName}
          className="border p-2 rounded-md w-64"
          readOnly
        />
        <span>замена:</span>
        <select
          name="employee2"
          className="border p-2 rounded-md w-64"
          required
        >
          <option value="">Выберите сотрудника</option>
          {employees
            .filter(
              (emp) =>
                emp.mail !== session?.user?.email && emp.role === userRole,
            )
            .map((emp) => (
              <option key={emp.id} value={emp.name}>
                {emp.name}
              </option>
            ))}
        </select>
        <DatePicker />

        <select name="shift" className="border p-2 rounded-md w-64" required>
          <option value="">Выберите смену</option>
          {SHIFTS.map((shift) => (
            <option key={shift} value={shift}>
              {shift}
            </option>
          ))}
        </select>

        <input type="hidden" name="dateRegister" value={now.toISOString()} />
        <input type="hidden" name="year" value={defaultYear} />
        <input type="hidden" name="month" value={defaultMonth} />

        <button
          type="submit"
          disabled={pending}
          className={`py-2 px-4 rounded-md text-white transition-colors ${
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
      </form>
    </div>
  );
}
