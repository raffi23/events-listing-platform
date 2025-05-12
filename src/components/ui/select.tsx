"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { cx } from "@/utils";
import { CheckIcon, ChevronDown } from "lucide-react";
import { FC, useState } from "react";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  placeholder?: string;
  label?: string;
  items: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
};

type OptionProps = {
  checked?: boolean;
  option: Option;
  onSelect?: (option: Option) => void;
};

const SelectOption: FC<OptionProps> = ({ checked, option, onSelect }) => {
  return (
    <div
      className="hover:bg-gray-200 p-2 flex items-center gap-2"
      onClick={() => onSelect?.(option)}
    >
      {checked && <CheckIcon size={12} />}
      {option.label}
    </div>
  );
};

const Select: FC<Props> = ({
  placeholder = "Select an item",
  label,
  value,
  onChange,
  items,
}) => {
  const [open, setOpen] = useState(false);
  const [firstValue] = value;
  const hasValue = Boolean(firstValue);
  const buttonValue = hasValue
    ? `${firstValue.label}${value.length > 1 ? `, +${value.length - 1}` : ""}`
    : placeholder;
  const [ref] = useClickOutside<HTMLDivElement>(() => {
    setOpen(false);
  });

  return (
    <div ref={ref} className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}

      <button
        className="text-start relative max-w-52 sm:min-w-52 border rounded-md h-9 p-2 focus-visible:outline-gray-600 dark:bg-gray-800"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={cx(!hasValue && "text-gray-400")}>{buttonValue}</span>

        <ChevronDown
          size={16}
          className={cx(
            "transition-transform duration-150 absolute top-1/2 -translate-y-1/2 right-1",
            open && "rotate-180"
          )}
        />
        {open && (
          <div
            className="absolute border rounded-md top-[calc(100%+0.625rem)] z-10 bg-white dark:bg-gray-800 left-0 w-full h-64 overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
            onBlur={() => setOpen(false)}
          >
            {items.map((item) => (
              <SelectOption
                key={item.value}
                option={item}
                onSelect={() => {
                  if (value.includes(item)) {
                    onChange(value.filter((option) => option !== item));
                  } else {
                    onChange([...value, item]);
                  }
                }}
                checked={value.includes(item)}
              />
            ))}
          </div>
        )}
      </button>
    </div>
  );
};

export { Select, SelectOption };
