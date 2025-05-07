import { cx } from "@/utils";
import Link, { LinkProps } from "next/link";
import { FC, PropsWithChildren } from "react";

interface Props extends LinkProps {
  className?: string;
}

const NextLink: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Link
      className={cx(
        "transition-colors hover:underline hover:text-blue-700 underline-offset-2",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default NextLink;
