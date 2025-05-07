import {
  Table,
  TableBody,
  TableCell,
  TableContent,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EventListing } from "@/types";
import { FC } from "react";
import EventsTableFilters from "./events-table-filters";
import EventsTableItem from "./events-table-item";

type Props = {
  events: EventListing[];
};
const EventsTable: FC<Props> = ({ events }) => {
  return (
    <Table>
      <EventsTableFilters />

      <TableContent>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Expires at</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {events.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No events were found
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <EventsTableItem key={event.id} event={event} />
            ))
          )}
        </TableBody>
      </TableContent>
    </Table>
  );
};

export default EventsTable;
