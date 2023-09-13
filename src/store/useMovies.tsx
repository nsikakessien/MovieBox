import { useQuery } from "react-query";
import { tmdbService } from ".";

export function usePopularMovies() {
  return useQuery("popularMovies", tmdbService.getPopularMovies);
}
