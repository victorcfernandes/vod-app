import React from "react";

import MoviesList from "../components/MoviesList";

class Home extends React.Component {
  state = {
    data: null
  };

  componentDidMount = () => {
    this.fetchData();
  };

  async fetchData() {
    const response = await fetch("https://demo2697834.mockable.io/movies");
    const data = await response.json();

    this.setState({ data: data });
  }

  render() {
    return (
      <div className="container">
        <MoviesList />

        {this.state.data ? this.state.data.entries.map(movie => <p>{movie.title}</p>) : null}
      </div>
    );
  }
}

export default Home;
