"use strict";

import React from "react";
import NavBarLink from './NavBarLink';
import Button from './Button';

const navBarStyle = {
  backgroundColor: "rgb(211,211,211)",
  padding: "0.5rem 0",
}

const menuBarStyle = {
  paddingRight: "1rem"
};

function NavBar({user}) {
  return (
    <nav className="pure-g" style={navBarStyle}>
      <NavBarLink id="brand" className="pure-u-sm-4-24" to="/">Kelsey Hagen</NavBarLink>
      <div className="pure-u-sm-20-24 pure-menu pure-menu-horizontal" style={menuBarStyle}>
        <NavBarLink className="pure-menu-item" to="/">Photos</NavBarLink>
        <NavBarLink className="pure-menu-item" to="/about">About Me</NavBarLink>
        <NavBarLink className="pure-menu-item" to="/contact">Contact</NavBarLink>
        { user.isAdmin ? <NavBarLink className="pure-menu-item" to="/upload">Manage Photos</NavBarLink> : null }
      </div>
    </nav>
  )
}

export default NavBar
