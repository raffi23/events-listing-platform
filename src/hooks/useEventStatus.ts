import { EventListing } from "@/types";
import { useMemo } from "react";

const useEventStatus = (event: EventListing) => {
  const status = useMemo(() => {
    const now = new Date();
    const eventStartDate = new Date(event.starts_at);
    const eventExpiryDate = new Date(event.expires_at);

    if (eventStartDate > now) return "Upcoming";
    if (eventExpiryDate > now) return "Ongoing";
    else return "Expired";
  }, [event.expires_at, event.starts_at]);

  return status;
};

export default useEventStatus;
