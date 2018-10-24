import React from "react";

import Player from "../components/Player";

const Movie = ({ movie, movieId, setAppState, appState }) => (
  <div>
    <Player movieId={movieId} movie={movie} setAppState={setAppState} appState={appState} />
  </div>
);

export default Movie;
