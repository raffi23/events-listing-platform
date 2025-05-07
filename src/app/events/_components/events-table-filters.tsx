"use client";

import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import { TableToolbar } from "@/components/ui/table";
import useDebounce from "@/hooks/useDebounce";
import { eventQuerySchema } from "@/utils/validations";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

type QuerySchema = z.infer<typeof eventQuerySchema>;

const EventsTableFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValues = Object.fromEntries(
    searchParams.entries()
  ) as QuerySchema;

  const debounceChangeHandler = useDebounce((updatedQuery) => {
    router.push(`/events?${updatedQuery}`);
  }, 350);

  const handleQueryChange = <T extends keyof QuerySchema>(
    key: T,
    value: QuerySchema[T]
  ) => {
    const { data: query } = eventQuerySchema.safeParse({
      ...currentValues,
      [key]: encodeURIComponent(value || ""),
    });
    const updatedQuery = new URLSearchParams(query);
    debounceChangeHandler(updatedQuery);
  };

  return (
    <TableToolbar>
      <Input
        label="Title"
        placeholder="Search by title"
        defaultValue={decodeURIComponent(currentValues?.title || "")}
        onChange={(e) => handleQueryChange("title", e.target.value)}
      />
      <Input
        label="Category"
        placeholder="Search by category"
        defaultValue={decodeURIComponent(currentValues?.type || "")}
        onChange={(e) => handleQueryChange("type", e.target.value)}
      />
      <Input
        label="Location"
        placeholder="Search by location"
        defaultValue={decodeURIComponent(currentValues?.location || "")}
        onChange={(e) => handleQueryChange("location", e.target.value)}
      />
      <DatePicker
        label="Start at"
        placeholder="Select date"
        defaultValue={decodeURIComponent(currentValues?.starts_at || "")}
        onChange={(e) => handleQueryChange("starts_at", e.target.value)}
      />
      <DatePicker
        label="Ends at"
        placeholder="Select date"
        defaultValue={decodeURIComponent(currentValues?.expires_at || "")}
        onChange={(e) => handleQueryChange("expires_at", e.target.value)}
      />
    </TableToolbar>
  );
};

export default EventsTableFilters;
