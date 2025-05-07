import { cx } from "@/utils";
import { ButtonHTMLAttributes, FC } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <button className={cx(className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
