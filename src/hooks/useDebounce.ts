"use client";

import { useCallback, useEffect, useRef } from "react";

type Callback = (...args: unknown[]) => void;
const useDebounce = (func: Callback, ms: number) => {
  const funcRef = useRef(func);
  const timeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const debounce = useCallback(
    (...args: Parameters<Callback>) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        funcRef.current(...args);
      }, ms);
    },
    [ms]
  );

  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return debounce;
};

export default useDebounce;
