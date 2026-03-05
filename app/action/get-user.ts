"use server";

import { db } from "@/lib/firebase";
import { redis } from "@/lib/redis";

const USERS_ACTION_TAG = "users";

export const getUsers = async () => {
  const cached = await redis.get(USERS_ACTION_TAG);
  if (cached) return cached;
  const snapshot = await db.collection(USERS_ACTION_TAG).get();
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  await redis.set(USERS_ACTION_TAG, users);
  return users;
};
