"use client";

import { useState, useEffect } from "react";

const useLocalDate = (date: string, mode?: "date" | "date-time" | "time") => {
  const [localDate, setLocalDate] = useState(date);

  useEffect(() => {
    switch (mode) {
      case "date-time":
        setLocalDate(new Date(date).toLocaleString());
        break;
      case "time":
        setLocalDate(new Date(date).toLocaleTimeString());
        break;
      default:
        setLocalDate(new Date(date).toLocaleDateString());
    }
  }, [date, mode]);

  return localDate;
};

export default useLocalDate;
