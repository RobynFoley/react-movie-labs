import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import headerBackground from "../../images/background.jpg";
import Pagination from "@mui/material/Pagination";

function MovieListPageTemplate({ movies =[], title, action, totalPages,  page, setPage  }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });
  

  const handleChange = (type, value) => {
    setPage(1);

    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container sx={{
        backgroundImage: `url(${headerBackground})`,
        backgroundSize: "cover",

        backgroundRepeat: "no-repeat",
      }}>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies} />

        <Grid size={12} sx={{ display: "flex", justifyContent: "center", padding: 2, background: "white" }}>
        <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        color="primary"
      />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
