"use client";

import { Spinner } from "@/components/spinner";
import {
  Table,
  TableBody,
  TableContent,
  TableHeader,
} from "@/components/ui/table";
import useDebounce from "@/hooks/useDebounce";
import { EventListing, EventsQuerySchema } from "@/types";
import { eventQuerySchema } from "@/utils/validations";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useState, useTransition } from "react";
import EventsTableFilters from "./events-table-filters";
import EventsTableFullRow from "./events-table-full-row";
import EventsTableHeadings from "./events-table-headings";
import EventsTableItem from "./events-table-item";

type Props = {
  events: EventListing[];
};
const EventsTable: FC<Props> = ({ events }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentValues, setCurrentValues] = useState<EventsQuerySchema>(
    Object.fromEntries(searchParams.entries())
  );

  const debounceChangeHandler = useDebounce((updatedQuery) => {
    startTransition(() => {
      router.push(`/events?${updatedQuery}`);
    });
  }, 350);

  const handleQueryChange = <T extends keyof EventsQuerySchema>(
    key: T,
    value: EventsQuerySchema[T]
  ) => {
    const data = Object.entries({
      ...currentValues,
      [key]: value,
    }).reduce((acc, [k, v]) => {
      if (!v) return acc;
      return { ...acc, [k]: v };
    }, {});
    const { data: query } = eventQuerySchema.safeParse(data);
    const updatedQuery = new URLSearchParams(query);
    setCurrentValues(Object.fromEntries(updatedQuery.entries()));
    debounceChangeHandler(updatedQuery);
  };

  return (
    <Table>
      <EventsTableFilters
        query={currentValues}
        handleQueryChange={handleQueryChange}
      />

      <TableContent>
        <TableHeader>
          <EventsTableHeadings />
        </TableHeader>

        <TableBody>
          {isPending ? (
            <EventsTableFullRow>
              <div className="flex justify-center">
                <Spinner />
              </div>
            </EventsTableFullRow>
          ) : events.length <= 0 ? (
            <EventsTableFullRow className="text-center">
              No events were found
            </EventsTableFullRow>
          ) : (
            events.map((event) => (
              <EventsTableItem
                key={event.id}
                event={event}
                onClick={() => router.push(`/events/${event.id}`)}
              />
            ))
          )}
        </TableBody>
      </TableContent>
    </Table>
  );
};

export default EventsTable;
