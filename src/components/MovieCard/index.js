import React from "react";
import Link from "react-router-dom/Link";

import "./styles.scss";

import placeholder from "../../images/placeholder.png";

const MoviesCard = ({ movie }) => (
  <li className="movie-card swiper-slide">
    <Link to="/movie">
      <img
        src={placeholder}
        data-src={movie.images[0].url}
        alt="Movie poster"
        className="movie-card__image swiper-lazy"
      />
      <div className="swiper-lazy-preloader" />
      <p className="movie-card__title">{movie.title}</p>
    </Link>
  </li>
);

export default MoviesCard;
