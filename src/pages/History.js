import React from "react";

import MoviesList from "../components/MoviesList";

const History = props => {
  const { history } = props.appState;
  return (
    <div className="container">
      <h1 className="page-title">History: previously watched</h1>
      {history ? (
        <MoviesList
          movies={Object.values(history)}
          appState={props.appState}
          setAppState={props.setAppState}
        />
      ) : (
        <div className="page-text">Nothing here yet. Go watch some movies!</div>
      )}
    </div>
  );
};

export default History;
