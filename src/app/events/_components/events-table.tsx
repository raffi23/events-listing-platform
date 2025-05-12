"use client";

import { Spinner } from "@/components/spinner";
import { Option } from "@/components/ui/select";
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
import { FC, useMemo, useState, useTransition } from "react";
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

  const { locations, categories } = useMemo(() => {
    return {
      locations: Array.from(new Set(events.map((e) => e.location))).map<Option>(
        (location) => ({
          label: location,
          value: location,
        })
      ),
      categories: Array.from(new Set(events.map((e) => e.type))).map<Option>(
        (type) => ({
          label: type,
          value: type,
        })
      ),
    };
  }, [events]);

  const [selectedLocations, setSelectedLocations] = useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const filteredEvents = useMemo(() => {
    const locationValues = selectedLocations.map((l) => l.value);
    const categoryValues = selectedCategories.map((c) => c.value);

    return events.filter((event) => {
      return (
        (!locationValues.length || locationValues.includes(event.location)) &&
        (!categoryValues.length || categoryValues.includes(event.type))
      );
    });
  }, [selectedCategories, selectedLocations, events]);

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
        locations={locations}
        categories={categories}
        selectedCategories={selectedCategories}
        selectedLocations={selectedLocations}
        onLocationChange={setSelectedLocations}
        onCategoryChange={setSelectedCategories}
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
          ) : filteredEvents.length <= 0 ? (
            <EventsTableFullRow className="text-center">
              No events were found
            </EventsTableFullRow>
          ) : (
            filteredEvents.map((event) => (
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
