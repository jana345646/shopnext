"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function FallBackImage({ src, alt, className }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      unoptimized
      className={className}
      onError={() => setImgSrc("/placeholder.png")}
    />
  );
}
