import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const Header = () => (
  <header className="header">
    <Link to="/" className="header__logo">
      Home
    </Link>
    <nav className="header__nav">
      <Link className="header__nav-item" to="/history">
        history
      </Link>
    </nav>
  </header>
);

export default Header;
