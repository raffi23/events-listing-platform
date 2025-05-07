"use client";

import { cx } from "@/utils";
import { FC, InputHTMLAttributes, useRef, useState } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const DatePicker: FC<Props> = ({
  label,
  value,
  defaultValue,
  placeholder,
  className,
  onChange,
  ...rest
}) => {
  const [innerValue, setInnerValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col gap-1 relative">
      {label && <label className="text-sm">{label}</label>}
      <button
        className={cx(
          "min-w-52 text-sm text-start border rounded-md h-9 p-2 focus-visible:outline-gray-600 w-full",
          className
        )}
        onClick={() => inputRef.current?.showPicker()}
      >
        {innerValue || defaultValue || value || placeholder}
      </button>
      <input
        ref={inputRef}
        type="date"
        className="absolute bottom-0 left-0 invisible pointer-events-none"
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          const value = e.target.value;
          setInnerValue(value);
          onChange?.(e);
        }}
        {...rest}
      />
    </div>
  );
};

export default DatePicker;
