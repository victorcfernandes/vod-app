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

  state = {
    data: null,
    history: null,
    navMap: [[{ name: "home", url: "/" }, { name: "history", url: "/history" }]],
    activeLink: { x: 0, y: 0 }
  };

  async componentDidMount() {
    await this.fetchData();

    this.hydrateStateWithLocalStorage();

    this.appRef.current.focus();

    window.addEventListener("beforeunload", () =>
      localStorage.setItem("history", JSON.stringify(this.state["history"]))
    );
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", () =>
      localStorage.setItem("history", JSON.stringify(this.state["history"]))
    );
  }

  async fetchData() {
    const response = await fetch("https://demo2697834.mockable.io/movies");
    const data = await response.json();

    this.setState({ data: data });
  }

  setAppState = newState => {
    this.setState(newState);
  };

  hydrateStateWithLocalStorage() {
    if (localStorage.hasOwnProperty("history")) {
      let value = localStorage.getItem("history");

      value = JSON.parse(value);
      this.setState({ history: value });
    }
  }

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

      if (
        typeof navMap[activeLink.y] !== "undefined" &&
        typeof navMap[activeLink.y][activeLink.x + 1] !== "undefined"
      ) {
        this.setState(prevState => ({
          activeLink: { ...prevState.activeLink, x: prevState.activeLink.x + 1 }
        }));
      }
    },
    moveleft: () => {
      const { activeLink, navMap } = this.state;

      if (
        typeof navMap[activeLink.y] !== "undefined" &&
        typeof navMap[activeLink.y][activeLink.x - 1] !== "undefined"
      ) {
        this.setState(prevState => ({
          activeLink: { ...prevState.activeLink, x: prevState.activeLink.x - 1 }
        }));
      }
    },
    enter: () => {
      const { activeLink, navMap } = this.state;
      const url = navMap[activeLink.y][activeLink.x].url;

      this.props.history.push(url);
      this.setState({ activeLink: { x: 0, y: 0 } });
    },
    esc: () => {
      this.props.history.push("/");
    }
  };

  render() {
    const { activeLink, data } = this.state;
    return (
      <HotKeys keyMap={keyMap} handlers={this.keyHandlers}>
        <div className="App" ref={this.appRef} tabIndex={1}>
          <Header activeRow={activeLink.y === 0} activeLink={activeLink} />

          <Switch>
            <Route
              path="/"
              exact
              render={() =>
                data ? <Home setAppState={this.setAppState} appState={this.state} /> : "Loading..."
              }
            />
            <Route
              path="/history"
              exact
              render={() => <History setAppState={this.setAppState} appState={this.state} />}
            />
            <Route
              path="/movie/:id"
              render={({ match }) =>
                data ? (
                  <Movie
                    movieId={match.params.id}
                    movie={this.state.data.entries[match.params.id]}
                    setAppState={this.setAppState}
                    appState={this.state}
                  />
                ) : (
                  "Loading..."
                )
              }
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </HotKeys>
    );
  }
}

export default withRouter(App);
