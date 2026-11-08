import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getTopRatedMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const TopRatedPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['Top Rated', page],
    queryFn: () => getTopRatedMovies(page),
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
      title='Top Rated Movies'
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
export default TopRatedPage;