import React from "react";
import Swiper from "swiper";

import "../../../node_modules/swiper/dist/css/swiper.css";

import "./styles.scss";

import MovieCard from "../MovieCard";

class MoviesList extends React.Component {
  componentDidMount() {
    this.updateNavMap();

    const isNavigationOnSlider = this.props.appState.activeLink.y === 1;
    this.swiper = new Swiper(".swiper-container", {
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      slidesPerView: 4.5,
      spaceBetween: 15,
      keyboard: {
        enabled: isNavigationOnSlider,
        onlyInViewport: true
      },
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 10
      },
      watchSlidesVisibility: true,
      centeredSlides: true
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { appState } = prevProps;
    const isNavigationOnSlider = appState.activeLink.y === 1;

    isNavigationOnSlider ? this.swiper.keyboard.enable() : this.swiper.keyboard.disable();

    // Sync Slider navigation with state
    if (isNavigationOnSlider && appState.activeLink.x !== this.swiper.activeIndex) {
      this.props.setAppState({
        activeLink: {
          x: this.swiper.activeIndex,
          y: appState.activeLink.y
        }
      });
    }
  }

  componentWillUnmount() {
    const navMap = this.props.appState.navMap.slice(0, 1);

    this.props.setAppState({ navMap: navMap });
  }

  updateNavMap() {
    const movieLinks = this.props.movies.reduce((acumulator, item, index) => {
      acumulator.push({ name: item.title, url: `/movie/${index}` });
      return acumulator;
    }, []);

    const navMap = [...this.props.appState.navMap, [...movieLinks]];

    this.props.setAppState({ navMap });
  }

  render() {
    const { movies, appState } = this.props;
    const isNavigationOnSlider = appState.activeLink.y === 1;
    return (
      <div
        className={`swiper-container movie-list ${
          isNavigationOnSlider ? "movie-list--active" : ""
        }`}>
        <ul className="swiper-wrapper">
          {movies ? movies.map((movie, key) => <MovieCard movie={movie} key={key} />) : null}
        </ul>

        <div className="swiper-pagination" />

        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </div>
    );
  }
}

export default MoviesList;
