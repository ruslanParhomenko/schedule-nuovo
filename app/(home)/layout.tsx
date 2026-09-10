import { Suspense } from "react";

import NavHeader from "@/components/nav-layout/nav-header";
import NavFooter from "@/components/nav-layout/nav-footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Suspense fallback={null}>
        <NavHeader />
      </Suspense>
      <div className="flex flex-1 justify-center items-center h-full mt-auto">
        {children}
      </div>
      <Suspense fallback={null}>
        <NavFooter />
      </Suspense>
    </div>
  );
}
