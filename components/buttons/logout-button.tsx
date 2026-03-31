"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Session } from "next-auth";

export default function LogOutButton({ session }: { session: Session | null }) {
  return (
    <div className="flex justify-center items-center">
      <span>привет {session?.user?.name}</span>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="h-7 w-7 px-1"
      >
        <LogOut className="w-4 h-4  font-bold" />
      </button>
    </div>
  );
}
