import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Outlet } from "react-router-dom";
import ErrorPage from "./domains/error-page/ErrorPage";
import Home from "./domains/home/Home";
import MovieDetails from "./domains/movie-details/MovieDetails";
import Search from "./domains/search/Search";
import ComingSoon from "./domains/ComingSoon/ComingSoon";
import Movies from "./domains/movies/Movies";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/tv-series",
        element: <ComingSoon />,
      },
      {
        path: "/upcoming",
        element: <ComingSoon />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);

export default router;
