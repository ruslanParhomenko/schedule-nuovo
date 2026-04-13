import { Options } from "../tabs/tabs-options";

export const SCHEDULE_NAV_ITEMS = [
  { value: "bar", label: "BAR" },
  { value: "cucina", label: "COOK" },
  { value: "dish", label: "DISH" },
];

//
type NAV_BY_PATCH_TYPE = Record<
  string,
  { navItems: Options; filterMonths: boolean }
>;

export const NAV_BY_PATCH = {
  schedule: { navItems: SCHEDULE_NAV_ITEMS, filterMonths: true },
  swap: { navItems: [], filterMonths: false },
} satisfies NAV_BY_PATCH_TYPE;
