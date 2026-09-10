"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { MONTHS } from "@/utils/get-month-days";
import { INITIAL_LINE_ITEM } from "@/components/nav-layout/constants";

const SignInRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated") {
      const month = new Date().getMonth();
      const params = new URLSearchParams(window.location.search);
      params.set("month", MONTHS[month]);
      router.replace(`/${INITIAL_LINE_ITEM}?${params.toString()}`, {
        scroll: false,
      });
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
};

export default SignInRedirect;
