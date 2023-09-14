import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Outlet } from "react-router-dom";
import ErrorPage from "./domains/error-page/ErrorPage";
import Home from "./domains/home/Home";
import MovieDetails from "./domains/movie-details/MovieDetails";
import Search from "./domains/search/Search";

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
        path: "/movies/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);

export default router;
