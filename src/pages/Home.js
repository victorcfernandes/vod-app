import React from "react";

import MoviesList from "../components/MoviesList";

class Home extends React.Component {
  componentDidMount() {
    const movieLinks = this.props.appState.data.entries.reduce((acumulator, item, index) => {
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

  render() {
    const { data } = this.props.appState;
    return (
      <div className="container">
        {data && (
          <MoviesList
            data={data}
            appState={this.props.appState}
            setAppState={this.props.setAppState}
          />
        )}
      </div>
    );
  }
}

export default Home;
