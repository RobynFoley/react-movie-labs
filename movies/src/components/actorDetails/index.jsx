
import React from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

const ActorDetails = ({ actor, credits }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 3 }}>

      {/* Actor information */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", sm: "row" },
          mb: 4,
        }}
      >
        {actor.profile_path && (
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            sx={{
              width: { xs: "100%", sm: 250 },
              maxWidth: 250,
              borderRadius: 2,
              objectFit: "cover",
              alignSelf: "flex-start",
            }}
          />
        )}

        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            {actor.name}
          </Typography>

          {actor.known_for_department && (
            <Chip
              label={actor.known_for_department}
              color="primary"
              sx={{ mb: 2 }}
            />
          )}

          <Typography variant="body1" gutterBottom>
            <strong>Born:</strong>{" "}
            {actor.birthday || "Unknown"}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Place of birth:</strong>{" "}
            {actor.place_of_birth || "Unknown"}
          </Typography>

          {actor.deathday && (
            <Typography variant="body1" gutterBottom>
              <strong>Died:</strong> {actor.deathday}
            </Typography>
          )}

          <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
            Biography
          </Typography>

          <Typography variant="body1">
            {actor.biography || "No biography available."}
          </Typography>
        </Box>
      </Box>

      {/* Actor filmography */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Also appears in
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 2,
        }}
      >
        {credits?.cast
          ?.filter((movie) => movie.poster_path)
          .map((movie) => (
            <Card
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)}
              sx={{
                minWidth: 150,
                maxWidth: 150,
                flexShrink: 0,
                cursor: "pointer",
                transition: "transform 0.3s ease",

                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
              />

              <CardContent>
                <Typography variant="subtitle2">
                  {movie.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {movie.character}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {movie.release_date?.substring(0, 4)}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>

    </Box>
  );
};

export default ActorDetails;
