"use client";

import { Spinner } from "@/components/spinner";
import useEventStatus from "@/hooks/useEventStatus";
import useInterval from "@/hooks/useInterval";
import { EventListing } from "@/types";
import { differenceInMinutes } from "date-fns";
import { FC, useState } from "react";

type Props = {
  event: EventListing;
};

function getTimeDifference(laterDate: Date, earlierDate: Date) {
  const totalMinutes = differenceInMinutes(laterDate, earlierDate);

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return `${days} days : ${hours} hours : ${minutes} minutes`;
}

const EventTimer: FC<Props> = ({ event }) => {
  const status = useEventStatus(event);
  const [countdown, setCountDown] = useState("");
  const now = new Date();
  const starts_at = new Date(event.starts_at);
  const expires_at = new Date(event.expires_at);

  useInterval(intervalHandler, 1000, true);

  function intervalHandler() {
    switch (status) {
      case "Expired":
        setCountDown(status);
        break;
      case "Upcoming":
        setCountDown(`Starting in: ${getTimeDifference(starts_at, now)}`);
        break;
      default:
        setCountDown(`Ending in: ${getTimeDifference(expires_at, now)}`);
    }
  }

  if (!countdown) {
    return <Spinner />;
  }

  return <p>{countdown}</p>;
};

export default EventTimer;
