import React from "react";
import { withRouter } from "react-router";

import "./styles.scss";

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.videoRef.current.addEventListener("ended", () => this.props.history.push("/"));

    const { history } = this.props.appState;

    this.props.setAppState({ history: { ...history, [this.props.movieId]: this.props.movie } });
  }

  componentWillUnmount() {
    this.videoRef.current.removeEventListener("ended", () => this.props.history.push("/"));
  }

  render() {
    const videoSrc = this.props.movie.contents[0].url;
    return (
      <video className="player" src={videoSrc} controls autoPlay ref={this.videoRef}>
        Sorry, your browser doesn't support embedded videos.
      </video>
    );
  }
}

export default withRouter(Player);
