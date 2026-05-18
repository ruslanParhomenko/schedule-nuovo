"use server";

//type
type rowShiftsType = {
  id: string;
  dayHours: string;
  nightHours: string;
  totalHours: string;
  employee: string;
  role: string;
  rate: string;
  employeeId: string;
  shifts: string[];
};

export type ScheduleData = {
  id: string;
  rowShifts: rowShiftsType[];
};

export async function getScheduleByMonthYear(
  month: string,
  year: string,
): Promise<ScheduleData[]> {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/schedule?month=${month}&year=${year}`,
    {
      next: {
        tags: ["schedule-new"],
      },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch schedule");
  return res.json();
}
