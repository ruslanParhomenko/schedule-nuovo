export const ROLE_URL = {
  bar: "restaurant",
  cucina: "cucina",
  dish: "dish",
};
export const SHIFTS = {
  bar: ["8", "9", "14", "18", "20"],
  cucina: ["7", "19"],
  dish: ["7", "19"],
};

export const COLOR_SHIFT = {
  0: "bg-gr/10",
  1: "text-rd",
  2: "text-bl",
  3: "text-rd",
  4: "text-rd",
};

export const color = {
  "7": "text-bl",
  "8": "text-bl",
  "9": "text-bl",
  "14": "text-gr",
  "18": "text-black",
  "19": "text-black",
  "20": "text-black",
  v: "text-bl/40 bg-bl/60 border-0",
  s: "bg-[#facc15]/50 text-bl/40 border-0",

  "/": "text-rd/40 bg-rd/60 border-0",
} as const;
export const SHIFT_OPTIONS = ["7", "8", "9", "14", "18", "19", "20"];
