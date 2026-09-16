export type rowShiftsType = {
  employee: string;
  employeeId: string;
  shifts: string[];
};

export type ScheduleData = {
  id: string;
  rowShifts: rowShiftsType[];
};
