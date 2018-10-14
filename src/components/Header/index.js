import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const checkActiveLink = (activeRow, activeColumn, linkYPosition) =>
  activeColumn === linkYPosition && activeRow ? "nav-link--active" : "";

const Header = ({ activeLink, activeRow }) => (
  <header className="header">
    <Link to="/" className={`header__logo ${checkActiveLink(activeRow, activeLink.x, 0)}`}>
      Home
    </Link>
    <nav className="header__nav">
      <Link
        className={`header__nav-item ${checkActiveLink(activeRow, activeLink.x, 1)}`}
        to="/history">
        history
      </Link>
    </nav>
  </header>
);

export default Header;
