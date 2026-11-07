import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getIrishMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const IrishPage = () => {
  const [movies, setMovies] = useState([]);

 useEffect(() => {
    getIrishMovies().then(movies => {
      setMovies(movies);
    });
  }, []);
  
  return (
    <PageTemplate
      title='Irish Movies'
      movies={movies?.results || []}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
    />
  );
};
export default IrishPage;