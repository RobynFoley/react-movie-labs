import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState, useRef  } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };
const MovieDetails = ({ movie, credits }) => {  // Don't miss this!
const navigate = useNavigate();
const [drawerOpen, setDrawerOpen] = useState(false);
const castRef = useRef(null);

const scrollCast = (direction) => {
  if (castRef.current) {
    castRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  }
};

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
       <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
    
      </Paper>
          <Fab
  color="primary"
  variant="extended"
  onClick={() => navigate(`/movies/${movie.id}/similar`)}
  sx={{
    position: "fixed",
    bottom: "6em",
    right: "1em",
  }}
>
  Similar Movies
</Fab>
           <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
   
<h2>Cast & Actors</h2>

<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

  {/* Left arrow */}
  <IconButton
    onClick={() => scrollCast("left")}
    aria-label="Scroll cast left"
  >
    <ChevronLeftIcon />
  </IconButton>

  <Box
    ref={castRef}
    sx={{
      display: "flex",
      overflowX: "auto",
      gap: 2,
      pb: 2,
      scrollBehavior: "smooth",
      flex: 1,
      "&::-webkit-scrollbar": {
        display: "none",
      },
      scrollbarWidth: "none",
    }}
  >
    {credits?.cast?.slice(0, 10).map((actor) => (
      <Card
          key={actor.id}
          onClick={() => navigate(`/actor/${actor.id}`)}
          sx={{
            minWidth: 150,
            maxWidth: 150,
            flexShrink: 0,
            cursor: "pointer",
            transition: "transform 0.3s ease",

            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 6,
            },
          }}
        >
        {actor.profile_path ? (
          <CardMedia
            component="img"
            height="200"
            image={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
            alt={actor.name}
          />
        ) : (
          <Box
            sx={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.300",
            }}
          >
            No image available
          </Box>
        )}

        <CardContent>
          <Typography variant="subtitle1">
            {actor.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {actor.character}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </Box>

  {/* Right arrow */}
  <IconButton
    onClick={() => scrollCast("right")}
    aria-label="Scroll cast right"
  >
    <ChevronRightIcon />
  </IconButton>

</Box>
      </>
  );
};
export default MovieDetails ;
