"use strict";

import React from "react";
import { Link } from "react-router-dom";

const defaultStyle = {
  fontFamily: "Robto",
  color: "rgba(0, 0, 0, 0.4)",
};

export default function NavBarLink(props) {
  const style = Object.assign({}, defaultStyle, props.style);
  const className = props.className;
  return (
    <p className={className} style={style}>
      <Link to={props.to}>{props.children}</Link>
    </p>
  );
}
