import NextLink from "@/components/ui/link";

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-svh xl:h-screen">
      <NextLink href="/events" className="text-3xl w-fit">
        Click here to view Event Listings
      </NextLink>
    </div>
  );
}
