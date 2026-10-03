import { getEmployees } from "@/app/action/get-employee";
import { getSwapsByKey } from "@/app/action/swap-action";
import { ArchiveSwapPage } from "@/features/archive";

export default async function Page() {
  const dateNow = new Date();
  const year = dateNow.getFullYear().toString();
  const monthNumber = dateNow.getMonth() + 1;

  const swapsList = await getSwapsByKey(`${year}-${monthNumber}`);
  const employees = (await getEmployees()) as {
    id: string;
    name: string;
    role: string;
    mail: string;
  }[];
  return <ArchiveSwapPage swapsList={swapsList} employees={employees} />;
}
