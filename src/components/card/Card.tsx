import { useState } from "react";
import { MoviesList } from "../../domains/home/types";
import LoveIcon from "../../assets/svg/love.svg";
import RedLoveIcon from "../../assets/svg/love-red.svg";

interface CardProps {
  movie: MoviesList;
  isLiked: boolean;
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card = ({
  movie,
  isLiked,
  setIsLiked,
  selectedId,
  setSelectedId,
}: CardProps) => {
  const [isPulsing, setIsPulsing] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setIsPulsing(true);

    setTimeout(() => {
      setIsPulsing(false);
    }, 300);
  };

  return (
    <div
      data-testid="movie-card"
      className="flex flex-col gap-3 w-full"
      onClick={() => setSelectedId(movie.id)}
    >
      <div className="relative">
        <img
          src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
            movie.poster_path
          }`}
          alt={`${movie.title} Poster`}
          data-testid="movie-poster"
          className="w-full h-[370px]"
        />
        <div
          className="absolute cursor-pointer w-[30px] h-[30px] flex justify-center items-center bg-[#F3F4F650] top-4 right-4 border border-[#F3F4F650] rounded-full backdrop-blur-md"
          onClick={toggleLike}
        >
          <img
            src={isLiked && selectedId === movie.id ? RedLoveIcon : LoveIcon}
            alt="Like Icon"
            className={`${isPulsing ? "animate-ping" : ""}`}
          />
        </div>
      </div>

      <p
        className="text-[#111827] text-[18px] font-bold max-w-[250px]"
        data-testid="movie-title"
      >
        {movie.title}
      </p>
      <p
        className="text-[#9CA3AF] font-bold text-xs"
        data-testid="movie-release-date"
      >
        {movie.release_date}
      </p>
    </div>
  );
};

export default Card;
