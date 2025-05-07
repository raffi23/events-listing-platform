import { EventListing } from "@/types";
import { fetchAPI } from "./fetch";

export const getEvents = async (query?: Record<string, string>) => {
  const url = `/events${query ? `?${new URLSearchParams(query)}` : ""}`;
  const response = await fetchAPI(url, { method: "GET" });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch Events with status code: ${response.status}`
    );
  }
  return (await response.json()) as EventListing[];
};
