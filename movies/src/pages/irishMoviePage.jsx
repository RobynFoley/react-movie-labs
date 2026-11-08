import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getIrishMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const IrishPage = () => {
 const [page, setPage] = useState(1);
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['irish', page],
    queryFn: () => getIrishMovies(page),
  })
    if (isPending) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }
  
  const movies = data.results;

  
  return (
    <PageTemplate
      title='Irish Movies'
      movies={movies}
        action={(movie) => {
              return (
                <>
                  <AddToFavoritesIcon movie={movie} />
                  <AddToPlaylistIcon movie={movie} />
                </>
              );         
        }}
    totalPages={data.total_pages}
    page={page}
    setPage={setPage}
    />
  );
};
export default IrishPage;