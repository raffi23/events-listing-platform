import {
  Card,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@/components/ui/card";
import NextLink from "@/components/ui/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100svh_-_2rem)] xl:h-[100vh_-_2rem] p-2">
      <Card className="w-full max-w-md text-center p-10">
        <CardHeader>
          <CardTitle>Page was not found 🤕</CardTitle>
          <CardSubtitle>Crickets......</CardSubtitle>
        </CardHeader>

        <CardContent className="flex justify-center gap-4">
          <NextLink href="/">Home {"-->"}</NextLink>
          <NextLink href="/events">Events {"-->"}</NextLink>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
