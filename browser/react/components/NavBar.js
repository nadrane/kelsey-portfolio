"use strict";

import React from "react";
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import NavBarLink from './NavBarLink'
import Button from './Button'

const style = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  padding: "5px",
  backgroundColor: "lightgray"
}

function NavBar({user}) {
  return (
    <div>
      <NavBarLink to="/">Kelsey Hagen</NavBarLink>
      <nav style={style}>
        <NavBarLink to="/">Photos</NavBarLink>
        <NavBarLink to="/about">About Me</NavBarLink>
        <Button>Contact</Button>
        { user.isAdmin ? <Button>Manage Photos</Button> : null }
      </nav>
    </div>
  )
}

export default NavBar
