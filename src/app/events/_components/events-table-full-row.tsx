import { TableCell, TableRow } from "@/components/ui/table";
import { cx } from "@/utils";
import { FC, HTMLAttributes } from "react";

const EventsTableFullRow: FC<HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <TableRow className={cx(className)} {...rest}>
      <TableCell colSpan={7}>{children}</TableCell>
    </TableRow>
  );
};

export default EventsTableFullRow;
