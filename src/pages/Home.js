import React from "react";

import MoviesList from "../components/MoviesList";

const Home = props => {
  const { data } = props.appState;
  return (
    <div className="container">
      <h1 className="page-title">Home</h1>
      {data && (
        <MoviesList
          movies={data.entries}
          appState={props.appState}
          setAppState={props.setAppState}
        />
      )}
    </div>
  );
};

export default Home;
