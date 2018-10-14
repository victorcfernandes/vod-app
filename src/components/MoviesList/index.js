import React from "react";
import Swiper from "swiper";

import "../../../node_modules/swiper/dist/css/swiper.css";

import "./styles.scss";

import MovieCard from "../MovieCard";

class MoviesList extends React.Component {
  componentDidMount() {
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
    const { appState } = this.props;
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

  render() {
    const { data } = this.props;
    return (
      <div className="swiper-container movie-list">
        <ul className="swiper-wrapper">
          {data ? data.entries.map((movie, key) => <MovieCard movie={movie} key={key} />) : null}
        </ul>

        <div className="swiper-pagination" />

        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </div>
    );
  }
}

export default MoviesList;
