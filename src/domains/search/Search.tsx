import { useRef, useEffect, useState } from "react";
import Logo from "../../components/header/Logo";
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../../components/pagination/Pagination";
import { useSearchMovies } from "../../store/useMovies";
import { MoviesList } from "../home/types";
import Card from "../../components/card/Card";
import PageLoader from "../../components/loader/Loader";
import { MovieResponseData } from "../../store/types";

const Search = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [moviesList, setMoviesList] = useState<MoviesList[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const debounceSearch = useDebounce(searchValue, 700);
  const { data: movies, isLoading } = useSearchMovies(
    debounceSearch,
    currentPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const numberOfPages = (movies?.data as MovieResponseData)?.total_pages;
    const listOfTheMovies = (movies?.data as MovieResponseData)?.results;
    setMoviesList(listOfTheMovies);
    setTotalPages(numberOfPages);
  }, [movies]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <header className="w-full flex flex-col md:flex-row items-center px-[37px] py-[59px]">
        <div className="flex justify-start w-full mb-4 md:hidden">
          <Logo />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          placeholder="Search For a Movie or TV Show"
          onChange={(e) => setSearchValue(e.target.value)}
          className="px-[6px] text-base py-[10px] border-[#666666] w-full border-2 rounded-md focus:outline-none"
        />
      </header>

      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          {debounceSearch.length > 0 && (
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
      )}
    </>
  );
};

export default Search;
