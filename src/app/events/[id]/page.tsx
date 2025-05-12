import EventTimer from "@/components/event-timer";
import NextImage from "@/components/next-image";
import {
  Card,
  CardContent,
  CardCover,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/config";
import { getEvents } from "@/lib/api";
import { PropsWithParams } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 60;
export const dynamicParams = true;

export const generateStaticParams = async () => {
  const events = await getEvents();
  return events.slice(0, 30).map((event) => ({ id: `${event.id}` }));
};

export const generateMetadata = async ({ params }: PropsWithParams) => {
  const id = (await params).id;
  const [event] = await getEvents({ id });
  if (!event) return { title: `Event not found | ${appConfig.short_name}` };
  else return { title: `${event.title} | ${appConfig.short_name}` };
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
        <div className="absolute max-sm:bottom-0 sm:top-0 left-0 p-3 text-sm bg-white dark:bg-gray-800 max-sm:rounded-tr-lg sm:rounded-br-lg">
          <Link href="/events">{"<--"} Back</Link>
        </div>
        <div className="absolute top-0 right-0 p-3 text-sm bg-white dark:bg-gray-800 rounded-bl-lg">
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
