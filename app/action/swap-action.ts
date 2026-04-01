"use server";

import { db } from "@/lib/firebase";
import admin from "firebase-admin";
import { unstable_cache, updateTag } from "next/cache";

export type SwapActionType = {
  role: string;
  date: string; // ISO string из формы
  employee1: string;
  employee2: string;
  shift: string;
  year: string;
  month: string;
  dateRegister: string; // ISO string для даты регистрации заявки
};

const SWAP_ACTION_TAG = "swap_actions";

export async function createSwap(
  _state: any, // первый аргумент useActionState
  formData: FormData,
) {
  const id = crypto.randomUUID();

  const employee1 = formData.get("employee1") as string;
  const employee2 = formData.get("employee2") as string;
  const dateStr = formData.get("date") as string;
  const role = formData.get("role") as string;
  const shift = formData.get("shift") as string;
  const year = formData.get("year") as string;
  const month = formData.get("month") as string;
  const dateRegister = formData.get("dateRegister") as string;

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
    id,
    date: admin.firestore.Timestamp.fromDate(parsedDate),
    role,
    employee1,
    employee2,
    shift,
    dateRegister: admin.firestore.Timestamp.fromDate(new Date(dateRegister)),
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

  updateTag(SWAP_ACTION_TAG);

  return { message: "Swap успешно создан!", error: false };
}

//delete

export async function deleteSwap(uniqueKey: string, id: string) {
  const docRef = db.collection(SWAP_ACTION_TAG).doc(uniqueKey);

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);
    if (!snap.exists) return;

    const raw = snap.data();
    const list = raw?.data ?? [];

    const filtered = list.filter((item: any) => item.id !== id);

    tx.update(docRef, { data: filtered });
  });

  updateTag(SWAP_ACTION_TAG);
}

//update

export async function updateSwap(
  uniqueKey: string,
  id: string,
  updatedData: Partial<SwapActionType>,
) {
  const docRef = db.collection(SWAP_ACTION_TAG).doc(uniqueKey);

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);
    if (!snap.exists) return;

    const raw = snap.data();
    const list = raw?.data ?? [];

    const updated = list.map((item: any) =>
      item.id === id
        ? {
            ...item,
            ...updatedData,
            date: updatedData.date
              ? admin.firestore.Timestamp.fromDate(new Date(updatedData.date))
              : item.date,
          }
        : item,
    );

    tx.update(docRef, { data: updated });
  });

  updateTag(SWAP_ACTION_TAG);
}

// get

export async function _getSwapsByKey(uniqueKey: string) {
  const doc = await db.collection(SWAP_ACTION_TAG).doc(uniqueKey).get();

  if (!doc.exists) return [];

  const data = doc.data()?.data ?? [];

  return data.map((item: any) => ({
    ...item,
    date: item.date.toDate().toISOString(),
    dateRegister: item.dateRegister.toDate().toISOString(),
  }));
}

export const getSwapsByKey = unstable_cache(_getSwapsByKey, [SWAP_ACTION_TAG], {
  revalidate: false,
  tags: [SWAP_ACTION_TAG],
});
