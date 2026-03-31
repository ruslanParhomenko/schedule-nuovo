"use server";

import { db } from "@/lib/firebase";
import admin from "firebase-admin";

export type SwapActionType = {
  role: string;
  date: string; // ISO string из формы
  employee1: string;
  employee2: string;
  shift: string;
  year: string;
  month: string;
};

const SWAP_ACTION_TAG = "swap_actions";

export async function createSwap(
  _state: any, // первый аргумент useActionState
  formData: FormData,
) {
  const employee1 = formData.get("employee1") as string;
  const employee2 = formData.get("employee2") as string;
  const dateStr = formData.get("date") as string;
  const role = formData.get("role") as string;
  const shift = formData.get("shift") as string;
  const year = formData.get("year") as string;
  const month = formData.get("month") as string;

  if (!employee1 || !employee2) {
    return { message: "Заполните оба поля", error: true };
  }

  const parsedDate = new Date(dateStr);
  if (isNaN(parsedDate.getTime())) {
    return { message: "Некорректная дата", error: true };
  }

  const uniqueKey = `${year}-${month}-${role}`;
  const docRef = db.collection(SWAP_ACTION_TAG).doc(uniqueKey);

  const newItem = {
    date: admin.firestore.Timestamp.fromDate(parsedDate),
    employee1,
    employee2,
    shift,
  };

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);
    if (!snap.exists) {
      tx.set(docRef, { data: [newItem] });
      return;
    }
    const raw = snap.data();
    tx.update(docRef, {
      data: [...(raw?.data ?? []), newItem],
    });
  });

  return { message: "Swap успешно создан!", error: false };
}
