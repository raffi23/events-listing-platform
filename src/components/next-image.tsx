"use client";

import { cx } from "@/utils";
import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";

const NextImage: FC<ImageProps> = ({ className, alt, src, ...rest }) => {
  const [hasError, setHasError] = useState(false);
  const blankUrl = "/blank.jpg";
  const imageUrl = src || blankUrl;
  const imageAlt = alt || "";

  return (
    <Image
      fill
      className={cx("h-full w-full flex-shrink-0 object-cover", className)}
      placeholder={"blur"}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjePTo0X4ACLYDZuSQSHoAAAAASUVORK5CYII="
      alt={imageAlt}
      src={hasError ? blankUrl : imageUrl}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
};

NextImage.displayName = "NextImage";

export default NextImage;
