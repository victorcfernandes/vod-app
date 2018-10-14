import React from "react";

import MoviesList from "../components/MoviesList";
import Player from "../components/Player";

class Home extends React.Component {
  state = {
    data: null,
    playing: null
  };

  async componentDidMount() {
    await this.fetchData();

    const movieLinks = this.state.data.entries.reduce((acumulator, item, index) => {
      acumulator.push({ name: item.title, url: `/movie/${index}` });
      return acumulator;
    }, []);

    const navMap = [...this.props.appState.navMap, [...movieLinks]];

    this.props.setAppState({ navMap });
  }

  componentWillUnmount() {
    const navMap = this.props.appState.navMap.slice(0, 1);

    this.props.setAppState({ navMap: navMap });
  }

  async fetchData() {
    const response = await fetch("https://demo2697834.mockable.io/movies");
    const data = await response.json();

    this.setState({ data: data });
  }

  render() {
    const { data, playing } = this.state;
    return (
      <div className="container">
        {data && <MoviesList data={data} appState={this.props.appState} />}
        {playing && <Player />}
      </div>
    );
  }
}

export default Home;
