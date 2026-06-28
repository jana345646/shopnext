"use client";
import { useMemo } from "react";
import { RiStarSLine, RiStarFill, RiStarHalfFill } from "react-icons/ri";

function RatingStars({ rate }: { rate: number }) {
  const fullStars = Math.floor(rate);
  const hasHalf = rate % 1 >= 0.5;

  const stars = useMemo(() => {
    //here we refactor the code and we used usememo to make this calculation one time not with each render , it will be done again only if the dependency array changed
    return Array.from({ length: 5 }, (_, index) => {
      if (index < fullStars) {
        return <RiStarFill key={index} className="text-yellow-500 text-xl" />;
      }

      if (index === fullStars && hasHalf) {
        return (
          <RiStarHalfFill key={index} className="text-yellow-500 text-xl" />
        );
      }

      return <RiStarSLine key={index} className="text-yellow-500 text-xl" />;
    });
  }, [fullStars, hasHalf]);

  return <div className="flex">{stars}</div>;
}

export default RatingStars;
