"use client";

import { createSwap } from "@/app/action/swap-action";
import { useActionState } from "react";

export default function SwapPage() {
  // initialState должен содержать все поля, которые мы планируем читать
  const initialState = { message: "", error: false };
  const [state, formAction, pending] = useActionState(createSwap, initialState);

  const now = new Date();
  const defaultYear = String(now.getFullYear());
  const defaultMonth = now.toLocaleString("default", { month: "long" });

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form action={formAction} className="flex flex-col gap-4">
        <input
          name="employee1"
          type="text"
          placeholder="Имя сотрудника 1"
          className="border p-2 rounded-md w-64"
          required
        />
        <input
          name="employee2"
          type="text"
          placeholder="Имя сотрудника 2"
          className="border p-2 rounded-md w-64"
          required
        />

        {/* скрытые поля */}
        <input type="hidden" name="date" value={now.toISOString()} />
        <input type="hidden" name="role" value="default" />
        <input type="hidden" name="shift" value="day" />
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

        {/* Сообщение об успехе или ошибке */}
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
