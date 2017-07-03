"use strict";

import React from "react";
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Button from './Button'

function NavBar({user}) {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarTitle text={"Kelsey Hagen"} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text={"Photos"} />
        <ToolbarTitle text={"About Me"} />
        <Button label="Contact" primary={true} />
        { user.isAdmin ? <Button label="Manage Photos" primary={true}/> : null }
      </ToolbarGroup>
    </Toolbar>
  )
}

export default NavBar
