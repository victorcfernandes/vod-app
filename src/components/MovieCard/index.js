import React from "react";

import "./styles.scss";

import placeholder from "../../images/placeholder.png";

const MoviesCard = ({ movie }) => (
  <li className="movie-card swiper-slide">
    <img
      src={placeholder}
      data-src={movie.images[0].url}
      alt="Movie poster"
      className="swiper-lazy"
    />
    <div className="swiper-lazy-preloader" />
    <p className="movie-card__title">{movie.title}</p>
  </li>
);

export default MoviesCard;
