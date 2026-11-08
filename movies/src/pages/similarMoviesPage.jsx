import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import SimilarMovies from "../components/similarMovies";
import Spinner from "../components/spinner";

const SimilarMoviesPage = () => {
  const { id } = useParams();

  const { data: movie, isPending, isError, error } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  if (isPending) return <Spinner />;
  if (isError) return <p>{error.message}</p>;

  return <SimilarMovies movie={movie} />;
};

export default SimilarMoviesPage;
