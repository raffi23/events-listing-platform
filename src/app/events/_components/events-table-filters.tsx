"use client";

import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import { TableToolbar } from "@/components/ui/table";
import useDebounce from "@/hooks/useDebounce";
import { eventQuerySchema } from "@/utils/validations";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

type QuerySchema = z.infer<typeof eventQuerySchema>;

const EventsTableFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentValues, setCurrentValues] = useState<QuerySchema>(
    Object.fromEntries(searchParams.entries())
  );

  const debounceChangeHandler = useDebounce((updatedQuery) => {
    router.push(`/events?${updatedQuery}`);
  }, 350);

  const handleQueryChange = <T extends keyof QuerySchema>(
    key: T,
    value: QuerySchema[T]
  ) => {
    const { data: query } = eventQuerySchema.safeParse({
      ...currentValues,
      [key]: value || "",
    });
    const updatedQuery = new URLSearchParams(query);
    setCurrentValues(Object.fromEntries(updatedQuery.entries()));
    debounceChangeHandler(updatedQuery);
  };

  return (
    <TableToolbar>
      <Input
        label="Title"
        placeholder="Search by title"
        value={decodeURIComponent(currentValues?.title || "")}
        onChange={(e) => handleQueryChange("title", e.target.value)}
        onClear={() => handleQueryChange("title", "")}
      />
      <Input
        label="Location"
        placeholder="Search by location"
        value={decodeURIComponent(currentValues?.location || "")}
        onChange={(e) => handleQueryChange("location", e.target.value)}
        onClear={() => handleQueryChange("location", "")}
      />
      <Input
        label="Category"
        placeholder="Search by category"
        value={decodeURIComponent(currentValues?.type || "")}
        onChange={(e) => handleQueryChange("type", e.target.value)}
        onClear={() => handleQueryChange("type", "")}
      />
      <DatePicker
        label="Start at"
        placeholder="Select date"
        value={decodeURIComponent(currentValues?.starts_at || "")}
        onChange={(e) => handleQueryChange("starts_at", e.target.value)}
      />
      <DatePicker
        label="Ends at"
        placeholder="Select date"
        value={decodeURIComponent(currentValues?.expires_at || "")}
        onChange={(e) => handleQueryChange("expires_at", e.target.value)}
      />
    </TableToolbar>
  );
};

export default EventsTableFilters;
