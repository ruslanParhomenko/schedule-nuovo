export const SCHEDULE_NAV_ITEMS = [
  { title: "BAR", href: "bar" },
  { title: "COOK", href: "cucina" },
  { title: "DISH", href: "dish" },
];

//
type NAV_BY_PATCH_TYPE = Record<
  string,
  { navItems: PageNavType[]; filterMonths: boolean }
>;

export const NAV_BY_PATCH = {
  schedule: { navItems: SCHEDULE_NAV_ITEMS, filterMonths: true },
  swap: { navItems: [], filterMonths: false },
} satisfies NAV_BY_PATCH_TYPE;

export type PageNavType = {
  title: string;
  href: string;
};
