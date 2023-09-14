import { QueryFunctionContext, useQuery } from "react-query";
import { MovieResponse, tmdbService } from ".";

export const usePopularMovies = () => {
  return useQuery("popularMovies", tmdbService.getPopularMovies);
};

export const useSearchMovies = (query: string, page: number) => {
  return useQuery(
    ["searchMovies", query, page],
    (
      context: QueryFunctionContext<[string, string, number], MovieResponse>
    ) => {
      const [_, query, page] = context.queryKey;
      return tmdbService.getsearchedMovies(query, page);
    }
  );
};
