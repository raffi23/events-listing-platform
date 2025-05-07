"use client";

import { useCallback, useEffect, useRef } from "react";

const useInterval = (func: () => void, ms: number, enabled: boolean = true) => {
  const interval = useRef<NodeJS.Timeout>(undefined);
  const funcRef = useRef(func);

  const stopInterval = () => {
    if (typeof interval.current !== "undefined") {
      clearInterval(interval.current);
      interval.current = undefined;
    }
  };

  const startInterval = useCallback(() => {
    stopInterval();
    interval.current = setInterval(funcRef.current, ms);
  }, [ms]);

  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  useEffect(() => {
    if (enabled) startInterval();
    else stopInterval();

    return stopInterval;
  }, [startInterval, enabled]);

  return { startInterval, stopInterval };
};

export default useInterval;
