import React from "react";
import moment from "moment";
import MovieTrailer from "./components/MovieTrailer";
import { useParams } from "react-router-dom";
import { useGetMovieDetails } from "../../store/useMovies";
import PageLoader from "../../components/loader/Loader";
import { MovieDetailsData } from "../../store/types";

const MovieDetails = () => {
  const params = useParams();
  console.log(moment.duration(169, "minutes").hours);

  const { data: movieDetail, isLoading: loadingDetails } = useGetMovieDetails(
    Number(params?.id)
  );

  const details = movieDetail?.data as MovieDetailsData;

  if (loadingDetails) {
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
        <div className="flex gap-[26px]">
          <div className="flex flex-col">
            <p className="text-[#404040] text-[23px] mb-[25px] font-medium flex gap-[17px]">
              <span data-testid="movie-title">{details.title}</span>
              <span className="flex items-center relative gap-3">
                <span className="relative top-[-5px]">.</span>
                {new Date(details.release_date).getFullYear()}
              </span>
              <span className="flex items-center relative gap-3">
                <span className="relative top-[-5px]">.</span>
                PG-13
              </span>
              <span className="flex items-center relative gap-3">
                <span className="relative top-[-5px]">.</span>
                <span>
                  {moment.duration(details.runtime, "minutes").hours()}h
                </span>
                <span>
                  {moment.duration(details.runtime, "minutes").minutes()}m
                </span>
              </span>
              {details.genres.map((genre) => (
                <span className="border border-[#F8E7EB] bg-white rounded-[15px] px-4 py-1 text-[#B91C1C] font-medium text-[15px]">
                  {genre.name}
                </span>
              ))}
            </p>
            <p className="text-md max-w-[774px] text-[#333] text-justify mb-9">
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
        </div>
      </main>
    </>
  );
};

export default MovieDetails;
