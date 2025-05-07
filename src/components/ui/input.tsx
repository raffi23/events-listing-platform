"use client";

import { cx } from "@/utils";
import { XIcon } from "lucide-react";
import { FC, InputHTMLAttributes, MouseEventHandler, useRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onClear?: MouseEventHandler<HTMLButtonElement>;
}

const Input: FC<Props> = ({ label, onClear, value, className, ...rest }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}
      <div className="relative">
        <input
          ref={ref}
          value={value}
          className={cx(
            "w-full sm:min-w-52 border rounded-md h-9 p-2 focus-visible:outline-gray-600 dark:bg-gray-800",
            className
          )}
          {...rest}
        />
        {value && (
          <button
            className="absolute p-px rounded transition-colors hover:dark:text-black hover:dark:bg-white hover:text-white hover:bg-gray-800 top-1/2 right-2 -translate-y-1/2"
            onClick={onClear}
          >
            <XIcon size={14} className="pointer-events-none" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
