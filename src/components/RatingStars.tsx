import { RiStarSLine, RiStarFill, RiStarHalfFill } from "react-icons/ri";

function RatingStars({ rate }: { rate: number }) {
  const fullStars = Math.floor(rate);
  const hasHalf = rate % 1 >= 0.5;

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => {
        if (index < fullStars) {
          return <RiStarFill key={index} className="text-yellow-500 text-xl" />;
        }

        if (index === fullStars && hasHalf) {
          return (
            <RiStarHalfFill key={index} className="text-yellow-500 text-xl" />
          );
        }

        return <RiStarSLine key={index} className="text-yellow-500 text-xl" />;
      })}
    </div>
  );
}

export default RatingStars;
