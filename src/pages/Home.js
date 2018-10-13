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
      <div className="container">{this.state.data && <MoviesList data={this.state.data} />}</div>
    );
  }
}

export default Home;
