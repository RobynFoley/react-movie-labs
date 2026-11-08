import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { getActor, getActorMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import ActorDetails from "../components/actorDetails";

const ActorPage = () => {
  const { id } = useParams();

  const {
    data: actor,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["actor", { id }],
    queryFn: getActor,
  });

  // Fetch actor filmography
  const { data: credits } = useQuery({
    queryKey: ["actorMovies", { id }],
    queryFn: getActorMovies,
    enabled: !!id,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {actor ? (
        <ActorDetails
          actor={actor}
          credits={credits}
        />
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorPage;
