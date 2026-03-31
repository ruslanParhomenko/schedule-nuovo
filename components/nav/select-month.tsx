import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTHS } from "@/utils/get-month-days";

export default function SelectByMonthYear({
  month,
  setMonth,
  year,
  setYear,
  isLoading,
  classNameMonthYear,
}: {
  month: string;
  setMonth: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  isLoading?: boolean;
  classNameMonthYear?: string;
}) {
  const currentMonthIndex = new Date().getMonth();

  const filteredMonths = [
    MONTHS[(currentMonthIndex - 1 + 12) % 12],
    MONTHS[currentMonthIndex],
    MONTHS[(currentMonthIndex + 1) % 12],
  ];

  const classNameSelect = `md:w-24 ${
    classNameMonthYear ? classNameMonthYear : "w-14"
  }  border-0 md:border p-1 rounded-md text-bl md:text-md text-xs shadow  [&>svg]:hidden justify-center`;
  return (
    <div className="flex justify-center items-center md:gap-4 gap-1">
      {/* <Select
        defaultValue={year}
        onValueChange={(value) => setYear(value)}
        disabled={isLoading}
      >
        <SelectTrigger className={classNameSelect}>
          <SelectValue placeholder="year" />
        </SelectTrigger>
        <SelectContent>
          {YEAR.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      <Select
        value={month}
        onValueChange={(value) => setMonth(value)}
        disabled={isLoading}
      >
        <SelectTrigger className={classNameSelect}>
          <SelectValue placeholder="month" />
        </SelectTrigger>
        <SelectContent>
          {filteredMonths.map((month) => (
            <SelectItem key={month} value={month}>
              {month.slice(0, 3).toLocaleUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
