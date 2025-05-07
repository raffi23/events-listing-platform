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
  const buttonValue = innerValue || defaultValue || value || placeholder;
  const isPlaceholder = buttonValue === placeholder;

  return (
    <div className="flex flex-col gap-1 relative sm:min-w-52">
      {label && <label className="text-sm">{label}</label>}
      <button
        className={cx(
          "inline-flex items-center text-start border rounded-md h-9 p-2 focus-visible:outline-gray-600 w-full",
          isPlaceholder && "text-gray-400",
          className
        )}
        onClick={() => inputRef.current?.showPicker()}
      >
        {buttonValue}
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
