import { useState, useEffect } from "react";
import Search from "../../assets/svg/search.svg";
import Imdb from "../../assets/svg/imdb.svg";
import Tomato from "../../assets/svg/tomato.svg";
import Play from "../../assets/svg/play-red.svg";
import CaretRight from "../../assets/svg/red-caret-tight.svg";
import { usePopularMovies } from "../../store/useMovies";
import PageLoader from "../../components/loader/Loader";
import { MoviesList } from "./types";
import Card from "../../components/card/Card";
import Logo from "../../components/header/Logo";
import { useAppState } from "../../context/AppContext";

const Home = () => {
  const [moviesToShow, setMoviesToShow] = useState<MoviesList[]>([]);
  const { data: movies, isLoading } = usePopularMovies();

  useEffect(() => {
    const moviesList = movies?.results.slice(0, 10);
    setMoviesToShow(moviesList);
  }, [movies]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <header className="w-full h-[70vh] bg-header-image bg-cover bg-center bg-no-repeat mb-[70px]">
        <div className="flex flex-col lg:gap-24">
          <div className="grid grid-cols-4 w-full pt-[22px] gap-6 px-6">
            <Logo />
            <div className="lg:col-span-2 lg:row-start-1 lg:col-start-1 row-start-2 col-span-4 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What do you want to watch?"
                  name=""
                  id=""
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
              {/* <img src={Menu} alt="Menu Icon" className="block lg:hidden" /> */}
            </div>
          </div>

          <div className="flex flex-col gap-4 px-6 w-full">
            <h1 className="text-xxl font-bold text-white lg:max-w-[404px]">
              John Wick 3 : Parabellum
            </h1>
            <div className="flex items-center gap-[34px]">
              <div className="flex items-center gap-4">
                <img src={Imdb} alt="Imdb Logo" />
                <p className="text-xs font-normal text-white">86.0 / 100</p>
              </div>
              <div className="flex items-center gap-4">
                <img src={Tomato} alt="Rotten Tomato Logo" />
                <p className="text-xs text-white font-normal">97%</p>
              </div>
            </div>
            <p className="max-w-[302px] font-medium text-sm text-white">
              John Wick is on the run after killing a member of the
              international assassins' guild, and with a $14 million price tag
              on his head, he is the target of hit men and women everywhere.
            </p>
            <button className="px-4 py-[6px] bg-[#BE123C] flex items-center gap-2 w-max">
              <img src={Play} alt="Play Icon" />
              <p className="text-white text-sm font-bold">WATCH TRAILER</p>
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col px-4">
        <div className="grid grid-cols-2 mb-11">
          <div className="w-full">
            <p className="text-black font-bold text-[36px]">Featured Movie</p>
          </div>
          <div className="w-full flex justify-end items-center gap-2">
            <p className="text-[#BE123C] text-[18px]">See more</p>
            <img src={CaretRight} alt="" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full lg:grid-cols-4 gap-4">
          {moviesToShow?.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
