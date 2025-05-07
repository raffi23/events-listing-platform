import { cx } from "@/utils";
import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<Props> = ({ label, className, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}
      <input
        className={cx(
          "w-full sm:min-w-52 border rounded-md h-9 p-2 focus-visible:outline-gray-600",
          className
        )}
        {...rest}
      />
    </div>
  );
};

export default Input;
