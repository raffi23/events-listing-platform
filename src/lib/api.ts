import { EventListing, EventListingQuery } from "@/types";
import { fetchAPI } from "./fetch";

export const getEvents = async (query?: EventListingQuery) => {
  const url = `/events${query ? `?${new URLSearchParams(query)}` : ""}`;
  const response = await fetchAPI(url, { method: "GET" });
  if (!response.ok) return [] as EventListing[];
  return (await response.json()) as EventListing[];
};
