export const SCHEDULE_NAV_ITEMS = [
  { title: "bar", href: "bar" },
  { title: "cucina", href: "cucina" },
  { title: "dish", href: "dish" },
];

//
type NAV_BY_PATCH_TYPE = Record<string, { navItems: PageNavType[] }>;

export const NAV_BY_PATCH = {
  schedule: { navItems: SCHEDULE_NAV_ITEMS },
} satisfies NAV_BY_PATCH_TYPE;

export type PageNavType = {
  title: string;
  href: string;
};
