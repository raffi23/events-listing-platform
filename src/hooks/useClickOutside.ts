import { useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement>(callback: () => void) => {
  const ref = useRef<T | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const clickHandler = (e: Event) => {
      if (!ref.current?.contains(e.target as Node)) {
        callbackRef.current();
      }
    };
    const clickEvents: (keyof WindowEventMap)[] = ["click", "touchend"];
    clickEvents.forEach((click_event) => {
      window.addEventListener(click_event, clickHandler);
    });
    return () => {
      clickEvents.forEach((click_event) => {
        window.removeEventListener(click_event, clickHandler);
      });
    };
  }, []);

  return [ref];
};

export default useClickOutside;
