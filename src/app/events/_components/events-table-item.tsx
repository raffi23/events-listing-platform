"use client";

import EventTimer from "@/components/event-timer";
import { TableCell, TableRow } from "@/components/ui/table";
import useLocalDate from "@/hooks/useLocalDate";
import { EventListing } from "@/types";
import { cx } from "@/utils";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLTableRowElement> {
  event: EventListing;
}

const EventsTableItem: FC<Props> = ({ event, className, ...rest }) => {
  const startRaw = new Date(event.starts_at);
  const expireRaw = new Date(event.expires_at);
  const startDate = useLocalDate(startRaw, "date-time");
  const expireDate = useLocalDate(expireRaw, "date-time");

  return (
    <TableRow className={cx("cursor-pointer", className)} {...rest}>
      <TableCell>{event.title}</TableCell>
      <TableCell>{event.location}</TableCell>
      <TableCell>{event.type}</TableCell>
      <TableCell>
        <EventTimer event={event} />
      </TableCell>
      <TableCell className="min-w-[170px]">{startDate}</TableCell>
      <TableCell className="min-w-[170px]">{expireDate}</TableCell>
    </TableRow>
  );
};

export default EventsTableItem;
