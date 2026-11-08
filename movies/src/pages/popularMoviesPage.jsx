import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getPopularMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const PopularPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['popular', page],
    queryFn: () => getPopularMovies(page),
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
      title='Popular Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
      totalPages={data.total_pages}
      page={page}
      setPage={setPage}
    />
  );
};
export default PopularPage;