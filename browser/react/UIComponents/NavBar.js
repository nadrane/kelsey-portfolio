"use strict";

import React from "react";
import NavBarLink from './NavBarLink';
import Button from './Button';

const navBarStyle = {
  backgroundColor: "lightgray",
}

function NavBar({user}) {
  return (
    <nav className="pure-g" style={navBarStyle}>
      <NavBarLink className="pure-u-sm-2-5" to="/">Kelsey Hagen</NavBarLink>
      <NavBarLink className="pure-u-sm-1-5" to="/">Photos</NavBarLink>
      <NavBarLink className="pure-u-sm-1-5" to="/about">About Me</NavBarLink>
      <Button className="pure-u-sm-1-5">Contact</Button>
      { user.isAdmin ? <Button>Manage Photos</Button> : null }
    </nav>
  )
}

export default NavBar
