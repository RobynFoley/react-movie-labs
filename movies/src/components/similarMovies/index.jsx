import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "../../api/tmdb-api";
import PageTemplate from "../templateMovieListPage";
import Spinner from "../spinner";
import AddToPlaylistIcon from "../cardIcons/addToPlaylist";
import AddToFavoritesIcon from '../cardIcons/addToFavorites'

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
    action={(movie) => {
              return (
                <>
                  <AddToFavoritesIcon movie={movie} />
                  <AddToPlaylistIcon movie={movie} />
                </>
              );         
        }}

    />
  );
};

export default SimilarMovies;
