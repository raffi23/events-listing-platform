import { getEvents } from "@/lib/api";
import Link from "next/link";

export const revalidate = 10 * 60;

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex flex-col gap-2">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          {event.title} - id: {event.id}
        </Link>
      ))}
    </div>
  );
}
