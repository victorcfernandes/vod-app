import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import { HotKeys } from "react-hotkeys";

import "./styles/styles.scss";

import Home from "./pages/Home";
import History from "./pages/History";
import Movie from "./pages/Movie";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import keyMap from "./keyMap";

class App extends Component {
  constructor(props) {
    super(props);

    this.appRef = React.createRef();
  }

  componentDidMount = () => {
    this.appRef.current.focus();
  };

  state = {
    navMap: [[{ name: "home", url: "/" }, { name: "history", url: "/history" }]],
    activeLink: { x: 0, y: 0 }
  };

  setAppState = newState => {
    this.setState(newState);
  };

  keyHandlers = {
    moveUp: () => {
      const { activeLink, navMap } = this.state;

      if (typeof navMap[activeLink.y - 1] !== "undefined") {
        this.setState(prevState => ({
          activeLink: { x: 0, y: prevState.activeLink.y - 1 }
        }));
      }
    },
    moveDown: () => {
      const { activeLink, navMap } = this.state;

      if (typeof navMap[activeLink.y + 1] !== "undefined") {
        this.setState(prevState => ({
          activeLink: { x: 0, y: prevState.activeLink.y + 1 }
        }));
      }
    },
    moveRight: () => {
      const { activeLink, navMap } = this.state;

      if (typeof navMap[activeLink.y][activeLink.x + 1] !== "undefined") {
        this.setState(prevState => ({
          activeLink: { ...prevState.activeLink, x: prevState.activeLink.x + 1 }
        }));
      }
    },
    moveleft: () => {
      const { activeLink, navMap } = this.state;

      if (typeof navMap[activeLink.y][activeLink.x - 1] !== "undefined") {
        this.setState(prevState => ({
          activeLink: { ...prevState.activeLink, x: prevState.activeLink.x - 1 }
        }));
      }
    },
    enter: () => {
      const { activeLink, navMap } = this.state;
      const url = navMap[activeLink.y][activeLink.x].url;

      this.props.history.push(url);
    },
    esc: () => {}
  };

  render() {
    const { activeLink } = this.state;
    return (
      <HotKeys keyMap={keyMap} handlers={this.keyHandlers}>
        <div className="App" ref={this.appRef} tabIndex={1}>
          <Header activeRow={activeLink.y === 0} activeLink={activeLink} />

          <Switch>
            <Route
              path="/"
              exact
              render={() => <Home setAppState={this.setAppState} appState={this.state} />}
            />
            <Route path="/history" exact component={History} />
            <Route path="/movie" exact component={Movie} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </HotKeys>
    );
  }
}

export default withRouter(App);
