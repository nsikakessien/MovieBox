import { MoviesList } from "../../domains/home/types";

interface CardProps {
  movie: MoviesList;
}

const Card = ({ movie }: CardProps) => {
  return (
    <div data-testid="movie-card" className="flex flex-col gap-3 w-full">
      <img
        src={movie.poster_path}
        alt={`${movie.title} Poster`}
        data-testid="movie-poster"
        className="w-full h-[370px]"
      />
      <p
        className="text-[#111827] text-[18px] font-bold"
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
