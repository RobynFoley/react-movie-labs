import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getNowPlayingMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const NowPlayingPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['now playing', page],
    queryFn: () => getNowPlayingMovies(page),
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
      title='Now Playing Movies'
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
export default NowPlayingPage;