import React from "react";

import "./styles.scss";

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.toggleFullScreen.bind(this));
  }

  toggleFullScreen(e) {
    if (e.keyCode === 13) {
      this.videoRef.current.webkitRequestFullScreen();
    }
  }

  render() {
    return (
      <video
        className="player"
        src="http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4"
        controls
        ref={this.videoRef}>
        Sorry, your browser doesn't support embedded videos.
      </video>
    );
  }
}

export default Player;
