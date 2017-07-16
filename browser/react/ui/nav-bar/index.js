"use strict";

import React from "react";
import { Link } from "react-router-dom";

import {link, brand, header, headerWrapper, headshot, headshotWrapper} from './nav-bar.scss';

function NavBar({user}) {
  return (
    <nav>
      <Link id={brand} to="/">Kelsey Hagen</Link>
      <div id={headshotWrapper}>
        <img id={headshot} src="images/headshot.jpg" />
      </div>
      <div id={headerWrapper}>
        <div id={header}>
          <Link className={link} to="/">Photos</Link>
          <Link className={link} to="/about">About Me</Link>
          <Link className={link} to="/contact">Contact</Link>
          { user.isAdmin ? <Link to="/upload">Manage Photos</Link> : null }
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
