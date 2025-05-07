import { cx } from "@/utils";
import { FC, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

const Table: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={cx("flex flex-col gap-4", className)} {...rest}>
      {children}
    </div>
  );
};

const TableToolbar: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cx(
        "sticky top-0 grid grid-cols-2 sm:flex sm:items-center gap-2 flex-wrap bg-white dark:bg-gray-800 rounded-md p-4 border-b",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const TableContent: FC<HTMLAttributes<HTMLTableElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className={cx("w-full text-sm", className)} {...rest}>
        {children}
      </table>
    </div>
  );
};

const TableHeader: FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <thead
      className={cx("bg-gray-100 dark:bg-gray-800 [&_tr]:border-b", className)}
      {...rest}
    >
      {children}
    </thead>
  );
};

const TableBody: FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <tbody className={cx(className)} {...rest}>
      {children}
    </tbody>
  );
};

const TableRow: FC<HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <tr
      className={cx(
        "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-100",
        className
      )}
      {...rest}
    >
      {children}
    </tr>
  );
};

const TableCell: FC<TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <td
      className={cx("p-4 align-middle whitespace-nowrap", className)}
      {...rest}
    >
      {children}
    </td>
  );
};

const TableHead: FC<ThHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <th
      className={cx(
        "text-start font-semibold align-middle text-gray-600 dark:text-white h-12 px-4",
        className
      )}
      {...rest}
    >
      {children}
    </th>
  );
};

export {
  Table,
  TableBody,
  TableCell,
  TableContent,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
};
