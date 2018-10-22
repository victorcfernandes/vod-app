import React from "react";
import { HotKeys } from "react-hotkeys";
import keyMap from "../../keyMap";

import "./styles.scss";

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    // document.addEventListener("keydown", this.toggleFullScreen.bind(this));
  }

  toggleFullScreen(e) {
    if (e.keyCode === 13) {
      console.log("====================================");
      console.log(this.videoRef);
      console.log("====================================");
      this.videoRef.current.webkitRequestFullScreen();
    }
  }

  keyHandlers = {
    enter: () => {
      console.log("====================================");
      console.log("inner");
      console.log("====================================");
      this.videoRef.current.webkitRequestFullScreen();
      //this.setState({ activeLink: { x: 0, y: 0 } });
    },
    esc: () => {
      //this.props.history.push("/");
    }
  };

  render() {
    return (
      <HotKeys keyMap={keyMap} handlers={this.keyHandlers}>
        <video
          className="player"
          src="http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4"
          controls
          autoPlay
          ref={this.videoRef}>
          Sorry, your browser doesn't support embedded videos.
        </video>
      </HotKeys>
    );
  }
}

export default Player;
