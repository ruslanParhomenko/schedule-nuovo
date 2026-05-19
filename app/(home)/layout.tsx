import { Suspense } from "react";
import NavMenu from "@/components/nav/nav-menu";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <NavMenu>{children}</NavMenu>
    </Suspense>
  );
}
