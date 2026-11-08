import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "../../api/tmdb-api";
import PageTemplate from "../templateMovieListPage";
import Spinner from "../spinner";

const SimilarMovies = ({ movie }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["similarMovies", { id: movie.id }],
    queryFn: getSimilarMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <PageTemplate
      title={`Similar Movies to ${movie.title}`}
      movies={data.results}
      action={() => null}

    />
  );
};

export default SimilarMovies;
