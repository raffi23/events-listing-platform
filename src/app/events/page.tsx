import { getEvents } from "@/lib/api";
import EventsTable from "./_components/events-table";
import { PropsWithParams } from "@/types";
import { eventQuerySchema } from "@/utils/validations";
import NextLink from "@/components/ui/link";
import { Metadata } from "next";
import { appConfig } from "@/config";

export const revalidate = 120;

export const metadata: Metadata = {
  title: `Events | ${appConfig.short_name}`,
  description: "Find the best events",
};

export default async function EventsPage({ searchParams }: PropsWithParams) {
  const { data: query } = eventQuerySchema.safeParse(await searchParams);
  const events = await getEvents(query);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-4 items-center">
        <NextLink
          href="/"
          className="text-2xl size-9 flex items-center justify-center hover:bg-gray-100 border rounded"
        >
          {"<"}
        </NextLink>
        <h1 className="text-4xl font-bold">Events listing</h1>
      </div>
      <EventsTable events={events} />
    </div>
  );
}
