import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";
import NavMenuHeader from "@/components/nav/nav-menu";
import LogOutButton from "@/components/buttons/logout-button";

const NavPage = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <div className="pl-2 w-full h-screen flex flex-col">
      <div className="flex justify-center items-center gap-4 py-2 text-xs text-gray-600">
        <span>привет {session.user?.name}</span>
        <LogOutButton />
      </div>
      <div className="flex flex-1 justify-center items-center">{children}</div>
      <div className="sticky bottom-2 bg-background">
        <NavMenuHeader />
      </div>
    </div>
  );
};

export default NavPage;
