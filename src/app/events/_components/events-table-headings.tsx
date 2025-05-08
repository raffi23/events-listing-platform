import { TableRow, TableHead } from "@/components/ui/table";

const EventsTableHeadings = () => {
  return (
    <TableRow>
      <TableHead>Title</TableHead>
      <TableHead>Location</TableHead>
      <TableHead>Type</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Starts</TableHead>
      <TableHead>Ends</TableHead>
    </TableRow>
  );
};

export default EventsTableHeadings;
