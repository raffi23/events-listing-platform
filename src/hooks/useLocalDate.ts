"use client";

import { formatDate } from "@/utils";
import useMounted from "./useMounted";
import { useEffect, useState } from "react";

const useLocalDate = (date: Date, mode?: "date" | "date-time" | "time") => {
  const mounted = useMounted();
  const [formatted, setFormatted] = useState("N/A");

  useEffect(() => {
    if (!mounted) return;
    setFormatted(formatDate(new Date(date), mode));
  }, [mounted, date, mode]);

  return formatted;
};

export default useLocalDate;
