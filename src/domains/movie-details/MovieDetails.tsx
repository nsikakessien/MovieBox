import moment from "moment";
import MovieTrailer from "./components/MovieTrailer";
import { useParams } from "react-router-dom";
import { useDiscoverMovies, useGetMovieDetails } from "../../store/useMovies";
import PageLoader from "../../components/loader/Loader";
import { MovieDetailsData, MovieResponseData } from "../../store/types";
import Star from "../../assets/svg/star.svg";
import Showtime from "../../assets/svg/showtime.svg";
import Watch1 from "../../assets/svg/watch-gray.svg";
import Watch2 from "../../assets/svg/watch-white.svg";

const MovieDetails = () => {
  const params = useParams();

  const formatNumber = (value: number): string => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "m";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k";
    } else {
      return value.toString();
    }
  };

  const { data: movieDetail, isLoading: loadingDetails } = useGetMovieDetails(
    Number(params?.id)
  );
  const { data: movies, isLoading } = useDiscoverMovies();

  const details = movieDetail?.data as MovieDetailsData;

  if (loadingDetails || isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <header className="p-[37px] w-full">
        <div className="border rounded-[20px] h-[70vh]">
          <MovieTrailer
            trailerKey={`${
              details?.videos?.results?.find((film) => film.type === "Trailer")
                ?.key
            }`}
          />
        </div>
      </header>

      <main className="px-[55px] pb-12">
        <div className="flex lg:justify-between lg:gap-0 gap-4 flex-col lg:flex-row items-center mb-[25px]">
          <p className="text-[#404040] text-[23px] font-medium flex gap-[17px] flex-col lg:flex-row">
            <span className="flex items-center sm:flex-row flex-col gap-[17px]">
              <span data-testid="movie-title">{details.title}</span>
              <span className="flex items-center relative gap-3">
                <span className="relative top-[-5px]">.</span>
                <span data-testid="movie-release-date">
                  {moment(new Date(details.release_date)).format(
                    "ddd, MMMM Do YYYY"
                  )}
                </span>
              </span>
              <span className="flex items-center relative gap-3">
                <span className="relative top-[-5px]">.</span>
                PG-13
              </span>
              <span className="flex items-center relative gap-3">
                <span className="relative top-[-5px]">.</span>
                <span data-testid="movie-runtime">
                  {details.runtime} minutes
                </span>
              </span>
            </span>

            <span className="flex items-start gap-3">
              {details.genres.map((genre) => (
                <span className="border border-[#F8E7EB] bg-white rounded-[15px] px-4 py-1 text-[#B91C1C] font-medium text-[15px]">
                  {genre.name}
                </span>
              ))}
            </span>
          </p>

          <div className="flex items-center gap-[9px]">
            <img src={Star} alt="Star Icon" />
            <p>{Math.round(details.vote_average * 10) / 10}</p>
            <div className="pl-3 border-l-4 border-[#666]">
              {formatNumber(details.vote_count)}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-[26px]">
          <div className="flex flex-col col-span-2">
            <p
              className="text-md max-w-[774px] text-[#333] text-justify mb-9"
              data-testid="movie-overview"
            >
              {details.overview}
            </p>

            <div className="flex flex-col gap-[31px]">
              <p className="text-md text-[#333]">
                Director :{" "}
                <span className="text-[#BE123C]">
                  {details.credits.crew
                    .filter((staff) => staff.job === "Director")
                    ?.map((director) => director.name)
                    .join(", ")}
                </span>
              </p>
              <p className="text-md text-[#333]">
                Writers :{" "}
                <span className="text-[#BE123C]">
                  {details.credits.crew
                    .filter((staff) => staff.job === "Writer")
                    ?.map((director) => director.name)
                    .join(", ")}
                </span>
              </p>
              <p className="text-md text-[#333]">
                Stars :{" "}
                <span className="text-[#BE123C]">
                  {details.credits?.cast
                    ?.map((actor) => actor.name)
                    .slice(0, 3)
                    .join(", ")}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <button className="flex justify-center  items-center py-3 gap-2 text-white bg-[#BE123C] mb-3">
              <img src={Showtime} alt="Showtimes Logo" />
              See Showtimes
            </button>
            <button className="flex mb-[33px] justify-center items-center py-3 gap-2 text-[#333333] bg-[#BE123C10] border border-[#BE123C]">
              <img src={Watch1} alt="watch Logo" />
              More watch options
            </button>

            <div className="grid grid-cols-3 w-full relative h-[229px] border rounded-[10px] overflow-hidden">
              {(movies?.data as MovieResponseData)?.results
                ?.slice(0, 4)
                .map((movie) => (
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
                      movie.poster_path
                    }`}
                    alt="movie poster"
                    className="w-full first:border-l first:rounded-l-[10px] last:border-r last:rounded-r-[10px] -z-10"
                  />
                ))}
              <div className="absolute bottom-0 right-0 left-0 px-4 py-3 flex items-center gap-3 border rounded-[10px] bg-[#12121250] backdrop-blur-sm">
                <img src={Watch2} alt="watch icon" />
                <p className="text-sm text-white">
                  The Best Movies and Shows in{" "}
                  {moment(new Date()).format("MMMM")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MovieDetails;
