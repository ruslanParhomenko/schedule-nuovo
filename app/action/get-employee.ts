"use server";

import { db } from "@/lib/firebase";
import { redis } from "@/lib/redis";

const EMPLOYEES_KEY = "employees";

const RESTAURANT_EMPLOYEES = new Set(["waiters", "barmen", "mngr", "cook"]);

export type GetEmployees = {
  id: string;
  name: string;
  role: string;
  mail: string;
  status: "active" | "fired";
};

export async function getEmployees(): Promise<GetEmployees[]> {
  const cached = await redis.get<GetEmployees[]>(EMPLOYEES_KEY);

  if (cached) {
    return cached.filter(
      (employee) =>
        employee.status === "active" && RESTAURANT_EMPLOYEES.has(employee.role),
    );
  }

  const snapshot = await db.collection("employees").get();

  const employees = snapshot.docs
    .map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name,
        role: data.role,
        mail: data.mail,
        status: data.status,
      };
    })
    .filter(
      (employee) =>
        employee.status === "active" && RESTAURANT_EMPLOYEES.has(employee.role),
    );

  return employees;
}
