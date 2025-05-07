export type EventListing = {
  id: number;
  title: string;
  location: string;
  description: string;
  type: string;
  starts_at: string;
  expires_at: string;
  image_url: string;
};

export type Stringify<T> = {
  [K in keyof T]?: string;
};

export type EventListingQuery = Stringify<EventListing>;

export type PropsWithParams = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
};
