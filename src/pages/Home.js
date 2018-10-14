import React from "react";

import MoviesList from "../components/MoviesList";
import Player from "../components/Player";

class Home extends React.Component {
  state = {
    data: null,
    playing: true
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
    const { data, playing } = this.state;
    return (
      <div className="container">
        {data && <MoviesList data={data} />}
        {playing && <Player />}
      </div>
    );
  }
}

export default Home;
