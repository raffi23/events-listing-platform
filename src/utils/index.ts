import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cx = function (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};
