import { getEmployees } from "@/app/action/get-employee";
import { getSwapsByKey } from "@/app/action/swap-action";
import SwapPage from "@/features/swap/swap-page";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const employees = (await getEmployees()) as {
    id: string;
    name: string;
    role: string;
    mail: string;
  }[];
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const swapsList = await getSwapsByKey(`${year}-${month}`);

  return (
    <SwapPage employees={employees} session={session} swapsList={swapsList} />
  );
}
