"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import useEventStatus from "@/hooks/useEventStatus";
import useLocalDate from "@/hooks/useLocalDate";
import { EventListing } from "@/types";
import { cx } from "@/utils";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLTableRowElement> {
  event: EventListing;
}

const EventsTableItem: FC<Props> = ({ event, className, ...rest }) => {
  const status = useEventStatus(event);
  const startDate = useLocalDate(event.starts_at);
  const expireDate = useLocalDate(event.expires_at);

  return (
    <TableRow className={cx("cursor-pointer", className)} {...rest}>
      <TableCell>{event.title}</TableCell>
      <TableCell>{event.location}</TableCell>
      <TableCell>{event.type}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{new Date(startDate).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(expireDate).toLocaleDateString()}</TableCell>
    </TableRow>
  );
};

export default EventsTableItem;
