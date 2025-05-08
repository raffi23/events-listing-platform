"use client";

import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import { TableToolbar } from "@/components/ui/table";
import { EventsQuerySchema } from "@/types";
import { FC } from "react";

type Props = {
  query?: EventsQuerySchema;
  handleQueryChange: <T extends keyof EventsQuerySchema>(
    key: T,
    value: EventsQuerySchema[T]
  ) => void;
};

const EventsTableFilters: FC<Props> = ({ query, handleQueryChange }) => {
  return (
    <TableToolbar>
      <Input
        label="Title"
        placeholder="Search by title"
        value={decodeURIComponent(query?.title || "")}
        onChange={(e) => handleQueryChange("title", e.target.value)}
        onClear={() => handleQueryChange("title", "")}
      />
      <Input
        label="Location"
        placeholder="Search by location"
        value={decodeURIComponent(query?.location || "")}
        onChange={(e) => handleQueryChange("location", e.target.value)}
        onClear={() => handleQueryChange("location", "")}
      />
      <Input
        label="Category"
        placeholder="Search by category"
        value={decodeURIComponent(query?.type || "")}
        onChange={(e) => handleQueryChange("type", e.target.value)}
        onClear={() => handleQueryChange("type", "")}
      />
      <DatePicker
        label="Start at"
        placeholder="Select date"
        value={decodeURIComponent(query?.starts_at || "")}
        onChange={(e) => handleQueryChange("starts_at", e.target.value)}
      />
      <DatePicker
        label="Ends at"
        placeholder="Select date"
        value={decodeURIComponent(query?.expires_at || "")}
        onChange={(e) => handleQueryChange("expires_at", e.target.value)}
      />
    </TableToolbar>
  );
};

export default EventsTableFilters;
