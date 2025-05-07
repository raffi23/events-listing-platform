"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import useEventStatus from "@/hooks/useEventStatus";
import { EventListing } from "@/types";
import Link from "next/link";
import { FC } from "react";

type Props = {
  event: EventListing;
};

const EventsTableItem: FC<Props> = ({ event }) => {
  const status = useEventStatus(event);

  return (
    <TableRow key={event.id}>
      <TableCell>
        <Link href={`/events/${event.id}`}>{event.title}</Link>
      </TableCell>
      <TableCell>{event.location}</TableCell>
      <TableCell>{event.type}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  );
};

export default EventsTableItem;
