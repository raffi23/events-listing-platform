import { cx } from "@/utils";
import { FC, HTMLAttributes } from "react";

const Card: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cx(
        "flex flex-col gap-4 border rounded-md overflow-hidden",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const CardCover: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={cx("relative h-52", className)} {...rest}>
      {children}
    </div>
  );
};

const CardHeader: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={cx("flex flex-col p-4 pb-0 gap-1", className)} {...rest}>
      {children}
    </div>
  );
};

const CardTitle: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <p className={cx("text-2xl font-medium", className)} {...rest}>
      {children}
    </p>
  );
};

const CardSubtitle: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cx("text-sm text-gray-500 dark:text-gray-400", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

const CardContent: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={cx("p-4 pt-0", className)} {...rest}>
      {children}
    </div>
  );
};

export { Card, CardCover, CardHeader, CardTitle, CardSubtitle, CardContent };
