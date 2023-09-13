import axios from "axios";

// const API_KEY = "178f7aafed9b85876e9786c5d64e8b7e";
const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  },
});

export const tmdbService = {
  getPopularMovies: async () => {
    const response = await axiosInstance.get("/movie/popular");
    return response.data;
  },
};
