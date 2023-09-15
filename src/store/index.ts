import axios from "axios";
import { MovieDetailsResponse, MovieResponse } from "./types";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_REACT_APP_API_KEY,
  },
});

export const tmdbService = {
  getPopularMovies: async () => {
    const response = await axiosInstance.get("/movie/popular");
    return response.data;
  },

  getsearchedMovies: async (
    query: string,
    page: number
  ): Promise<MovieResponse> => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query,
          page,
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  },

  getMovieDetails: async (id: number): Promise<MovieDetailsResponse> => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
          movie_id: id,
          append_to_response: "videos,credits,similar",
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  },
};
