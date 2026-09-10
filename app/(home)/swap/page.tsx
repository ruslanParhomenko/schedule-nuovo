import { getEmployees } from "@/app/action/get-employee";
import { getSwapsByKey } from "@/app/action/swap-action";
import SwapPage from "@/features/swap/swap-page";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const dateNow = new Date();
  const year = dateNow.getFullYear().toString();
  const monthNumber = dateNow.getMonth() + 1;

  const session = await getServerSession(authOptions);
  const employees = (await getEmployees()) as {
    id: string;
    name: string;
    role: string;
    mail: string;
  }[];
  const swapsList = await getSwapsByKey(`${year}-${monthNumber}`);
  return (
    <SwapPage employees={employees} session={session} swapsList={swapsList} />
  );
}
