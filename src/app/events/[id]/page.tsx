import NextImage from "@/components/next-image";
import {
  Card,
  CardContent,
  CardCover,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@/components/ui/card";
import { getEvents } from "@/lib/api";
import { PropsWithParams } from "@/types";
import EventTimer from "./_component/event-timer";
import Link from "next/link";
import { redirect } from "next/navigation";
import { config } from "@/config";

export const revalidate = 60;
export const dynamicParams = true;

export const generateStaticParams = async () => {
  const events = await getEvents();
  return events.slice(0, 30).map((event) => ({ id: `${event.id}` }));
};

export const generateMetadata = async ({ params }: PropsWithParams) => {
  const id = (await params).id;
  const [event] = await getEvents({ id });
  if (!event) return { title: `Event not found | ${config.short_name}` };
  else return { title: `${event.title} | ${config.short_name}` };
};

export default async function EventPage({ params }: PropsWithParams) {
  const id = (await params).id;
  const [event] = await getEvents({ id });

  if (!event) {
    redirect("/not_found");
  }

  return (
    <Card>
      <CardCover>
        <NextImage src={event.image_url} alt="" />
        <div className="absolute max-sm:bottom-0 sm:top-0 left-0 p-3 text-sm bg-white max-sm:rounded-tr-lg sm:rounded-br-lg">
          <Link href="/events">{"<--"} Back</Link>
        </div>
        <div className="absolute top-0 right-0 p-3 text-sm bg-white rounded-bl-lg">
          <EventTimer event={event} />
        </div>
      </CardCover>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardSubtitle>
          {event.type} - {event.location}
        </CardSubtitle>
      </CardHeader>
      <CardContent>{event.description}</CardContent>
    </Card>
  );
}
