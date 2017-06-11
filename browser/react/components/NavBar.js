"use strict";

import React from "React";
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

const contactStyle = {
  marginLeft: '0px',
  marginRight: '0px',
}

function NavBar() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarTitle text={"Kelsey Hagen"} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text={"Photos"} />
        <ToolbarTitle text={"About Me"} />
        <RaisedButton label="Contact" style={contactStyle} primary={true} />
      </ToolbarGroup>
    </Toolbar>
  )
}

export default NavBar
