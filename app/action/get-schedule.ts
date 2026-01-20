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
  year: string;
  month: string;
  role: string;
  rowShifts: rowShiftsType[];
  uniqueKey: string;
};

// get by filters
// export const _getScheduleByMonthYear = async (month: string, year: string) => {
//   const snapshot = await db
//     .collection("schedule")
//     .where("month", "==", month)
//     .where("year", "==", year)
//     .get();

//   if (snapshot.empty) return [];

//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as ScheduleData[];
// };

// export const getScheduleByMonthYear = unstable_cache(
//   _getScheduleByMonthYear,
//   ["schedule"],
//   {
//     revalidate: false,
//     tags: ["schedule"],
//   }
// );

export async function getScheduleByMonthYear(month: string, year: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/schedule?month=${month}&year=${year}`,
    {
      next: {
        tags: ["schedule"],
      },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch schedule");
  return res.json();
}
