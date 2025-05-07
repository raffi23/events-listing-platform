import NextLink from "@/components/ui/link";

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-[calc(100svh_-_2rem)] xl:h-[100vh_-_2rem]">
      <NextLink href="/events" className="text-3xl w-fit text-center">
        Click here to view Events Listing
      </NextLink>
    </div>
  );
}
