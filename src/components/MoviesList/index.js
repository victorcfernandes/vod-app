import React from "react";
import Swiper from "swiper";

import "../../../node_modules/swiper/dist/css/swiper.css";

import "./styles.scss";

import MovieCard from "../MovieCard";

class MoviesList extends React.Component {
  componentDidMount() {
    new Swiper(".swiper-container", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      slidesPerView: 4.5,
      spaceBetween: 15,
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 10
      },
      watchSlidesVisibility: true,
      centeredSlides: true
    });
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
