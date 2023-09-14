import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: import.meta.env.VITE_REACT_APP_API_KEY,
  },
});

export const tmdbService = {
  getPopularMovies: async () => {
    const response = await axiosInstance.get("/movie/popular");
    return response.data;
  },
};
