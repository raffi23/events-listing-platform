import { getEvents } from "@/lib/api";
import { PropsWithParams } from "@/types";

export const revalidate = 60;
export const dynamicParams = true;

export const generateStaticParams = async () => {
  const events = await getEvents();
  return events.slice(0, 30).map((event) => ({ id: `${event.id}` }));
};

export default async function EventPage({ params }: PropsWithParams) {
  const id = (await params).id;
  const [event] = await getEvents({ id });

  if (!event) return null;

  return <div>{event.title}</div>;
}
