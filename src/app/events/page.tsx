import { getEvents } from "@/lib/api";
import EventsTable from "./_components/events-table";
import { PropsWithParams } from "@/types";
import { eventQuerySchema } from "@/utils/validations";

export const revalidate = 10 * 60;

export default async function EventsPage({ searchParams }: PropsWithParams) {
  const { data: query } = eventQuerySchema.safeParse(await searchParams);
  const events = await getEvents(query);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold">Event listings</h1>
      <EventsTable events={events} />
    </div>
  );
}
