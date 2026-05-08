import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return <FaStar key={star} className="text-yellow-400" size={14} />;
        } else if (rating >= star - 0.5) {
          return (
            <FaStarHalfAlt key={star} className="text-yellow-400" size={14} />
          );
        } else {
          return <FaRegStar key={star} className="text-gray-300" size={14} />;
        }
      })}
    </div>
  );
}
