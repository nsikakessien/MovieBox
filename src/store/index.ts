import axios from "axios";
import { MoviesList } from "../domains/home/types";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_REACT_APP_API_KEY,
  },
});

export interface MovieResponseData {
  page: number;
  results: MoviesList[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponse {
  success: boolean;
  data: MovieResponseData | unknown;
}

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
};
