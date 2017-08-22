"use strict";

import React from "react";
import { Link } from "react-router-dom";

import {link, brand, header, headerWrapper, headshot, headshotWrapper} from './header.scss';

function NavBar({user}) {
  return (
    <nav>
      <div id={headshotWrapper}>
        <img id={headshot} src="images/headshot.jpg" />
      </div>
      <Link id={brand} to="/">Kelsey Hagen</Link>
      <div id={headerWrapper}>
        <div id={header}>
          <Link className={link} to="/about">About Me</Link>
          <Link className={link} to="/contact">Contact</Link>
          { user.isAdmin ? <Link className={link} to="/upload">Manage Photos</Link> : <Link className={link} to="/login">Login</Link> }
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
