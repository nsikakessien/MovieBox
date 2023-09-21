import { QueryFunctionContext, useQuery } from "react-query";
import { tmdbService } from ".";
import { MovieDetailsResponse, MovieResponse } from "./types";

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

export const useGetMovieDetails = (id: number) => {
  return useQuery(
    ["movieDetails", id],
    (context: QueryFunctionContext<[string, number], MovieDetailsResponse>) => {
      const [_, id] = context.queryKey;
      return tmdbService.getMovieDetails(id);
    },
    {
      enabled: !!id,
    }
  );
};

export const useDiscoverMovies = (page: number) => {
  return useQuery(
    ["discoverMovies", page],
    (context: QueryFunctionContext<[string, number], MovieResponse>) => {
      const [_, page] = context.queryKey;
      return tmdbService.getDiscoverMovies(page);
    }
  );
};
