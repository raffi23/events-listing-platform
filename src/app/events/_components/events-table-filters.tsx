"use client";

import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import { Option, Select } from "@/components/ui/select";
import { TableToolbar } from "@/components/ui/table";
import { EventsQuerySchema } from "@/types";
import { FC } from "react";

type Props = {
  locations: Option[];
  categories: Option[];
  selectedLocations: Option[];
  selectedCategories: Option[];
  onLocationChange: (values: Option[]) => void;
  onCategoryChange: (values: Option[]) => void;
  query?: EventsQuerySchema;
  handleQueryChange: <T extends keyof EventsQuerySchema>(
    key: T,
    value: EventsQuerySchema[T]
  ) => void;
};

const EventsTableFilters: FC<Props> = ({
  locations,
  categories,
  selectedCategories,
  selectedLocations,
  onLocationChange,
  onCategoryChange,
  query,
  handleQueryChange,
}) => {
  return (
    <TableToolbar>
      <Input
        label="Title"
        placeholder="Search by title"
        value={decodeURIComponent(query?.title || "")}
        onChange={(e) => handleQueryChange("title", e.target.value)}
        onClear={() => handleQueryChange("title", "")}
      />
      <Select
        label="Location"
        value={selectedLocations}
        onChange={(v) => onLocationChange(v)}
        items={locations}
      />
      <Select
        label="Categories"
        value={selectedCategories}
        onChange={(v) => onCategoryChange(v)}
        items={categories}
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
