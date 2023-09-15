import { useState, useEffect } from "react";
import Search from "../../assets/svg/search.svg";
import Play from "../../assets/svg/play-red.svg";
import CaretRight from "../../assets/svg/red-caret-tight.svg";
import { useGetMovieDetails, usePopularMovies } from "../../store/useMovies";
import PageLoader from "../../components/loader/Loader";
import { MoviesList } from "./types";
import Card from "../../components/card/Card";
import Logo from "../../components/header/Logo";
import { useNavigate } from "react-router-dom";
import { MovieDetailsData } from "../../store/types";

const Home = () => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [topMovieId, setTopMovieId] = useState(0);
  const [moviesToShow, setMoviesToShow] = useState<MoviesList[]>([]);
  const { data: movies, isLoading } = usePopularMovies();
  const { data: movieDetail, isLoading: loadingDetails } =
    useGetMovieDetails(topMovieId);

  useEffect(() => {
    const moviesList = movies?.results.slice(0, 10);
    setMoviesToShow(moviesList);
    setTopMovieId(moviesList?.[0]?.id);
  }, [movies]);

  if (isLoading || loadingDetails) {
    return <PageLoader />;
  }

  return (
    <>
      <header className="w-full p-[37px]">
        <div className="w-full h-[70vh] relative">
          <img
            src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}${
              moviesToShow?.[0]?.poster_path
            }`}
            alt="movie poster"
            className="w-full h-full object-cover -z-10 border rounded-[20px]"
          />
          <div
            className={`flex flex-col lg:gap-24 absolute top-0 w-full h-full border rounded-[20px] bg-[#0d0d0d70]`}
          >
            <div className="grid grid-cols-4 w-full pt-[22px] gap-6 px-6">
              <Logo />
              <div className="lg:col-span-2 lg:row-start-1 lg:col-start-1 row-start-2 col-span-4 w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What do you want to watch?"
                    name=""
                    id=""
                    onFocus={() => navigate("/search")}
                    className="px-[6px] text-white text-base py-[10px] bg-transparent border-[#D1D5DB] w-full border-2 rounded-md focus:outline-none"
                  />
                  <img
                    src={Search}
                    alt="Search"
                    className="absolute right-[10px] top-[15px]"
                  />
                </div>
              </div>
              <div className="flex sm:gap-[27px] gap-5 row-start-1 col-start-4 items-center w-full justify-end lg:justify-center">
                <p className="sm:text-base text-xs whitespace-nowrap font-bold text-white">
                  Sign in
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-6 w-full">
              <h1 className="md:text-xxl text-xl font-bold text-white lg:max-w-[404px]">
                {moviesToShow?.[0]?.title}
              </h1>

              <p className="max-w-[302px] font-medium text-sm text-white">
                {moviesToShow?.[0]?.overview}
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${
                  (
                    movieDetail?.data as MovieDetailsData
                  )?.videos?.results?.find((film) => film.type === "Trailer")
                    ?.key
                }`}
                target="_blank"
              >
                <button className="px-4 py-[6px] bg-[#BE123C] flex items-center gap-2 w-max">
                  <img src={Play} alt="Play Icon" />
                  <p className="text-white text-sm font-bold">WATCH TRAILER</p>
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col px-[37px]">
        <div className="grid grid-cols-2 mb-11">
          <div className="w-full">
            <p className="text-black font-bold md:text-[36px] text-[18px]">
              Featured Movies
            </p>
          </div>
          <div className="w-full flex justify-end items-center gap-2">
            <p className="text-[#BE123C] text-[18px]">See more</p>
            <img src={CaretRight} alt="" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full lg:grid-cols-4 gap-4">
          {moviesToShow?.map((movie) => (
            <Card
              key={movie.id}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              movie={movie}
              isLiked={isLiked}
              setIsLiked={setIsLiked}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
