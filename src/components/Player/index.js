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
  }

  render() {
    return (
      <video
        className="player"
        src="http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4"
        controls
        autoPlay
        ref={this.videoRef}>
        Sorry, your browser doesn't support embedded videos.
      </video>
    );
  }
}

export default withRouter(Player);
