import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import Card from "../../components/card/Card";
import PageLoader from "../../components/loader/Loader";
import Logo from "../../components/header/Logo";
import { MoviesList } from "../home/types";
import { useDiscoverMovies } from "../../store/useMovies";
import { MovieResponseData } from "../../store/types";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [moviesList, setMoviesList] = useState<MoviesList[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: movies, isLoading } = useDiscoverMovies(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const numberOfPages = (movies?.data as MovieResponseData)?.total_pages;
    const listOfTheMovies = (movies?.data as MovieResponseData)?.results;
    setMoviesList(listOfTheMovies);
    setTotalPages(numberOfPages);
  }, [movies]);

  return (
    <>
      <header className="w-full flex flex-col md:flex-row items-center px-[37px] py-[59px]">
        <div className="flex justify-start w-full mb-4 md:hidden">
          <Logo />
        </div>
        <input
          type="text"
          placeholder="Search For a Movie or TV Show"
          className="px-[6px] text-base py-[10px] border-[#666666] w-full border-2 rounded-md focus:outline-none"
          onFocus={() => navigate("/search")}
        />
      </header>

      {isLoading ? (
        <PageLoader />
      ) : (
        <main className="px-[37px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full lg:grid-cols-4 gap-4">
          {moviesList?.map((movie) => (
            <Card
              key={movie.id}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              movie={movie}
              isLiked={isLiked}
              setIsLiked={setIsLiked}
            />
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      )}
    </>
  );
};

export default Movies;
