import clsx, { ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export const cx = function (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export const formatDate = (
  date: Date,
  mode?: "date" | "time" | "date-time"
) => {
  let dateFormat: string;
  switch (mode) {
    case "date-time":
      dateFormat = "dd/MM/yyyy p";
      break;
    case "time":
      dateFormat = "p";
      break;
    default:
      dateFormat = "dd/MM/yyyy";
  }
  return format(date, dateFormat);
};
