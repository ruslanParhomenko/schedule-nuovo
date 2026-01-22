"use server";

import { db } from "@/lib/firebase";
import { redis } from "@/lib/redis";

const EMPLOYEES_KEY = "employees";

export async function getEmployees() {
  const cached = await redis.get(EMPLOYEES_KEY);
  if (cached) return cached;

  const snapshot = await db.collection("employees").get();
  const employees = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  await redis.set(EMPLOYEES_KEY, employees);

  return employees;
}
