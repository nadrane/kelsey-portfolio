"use strict";

import React from "react";
import { Link } from "react-router-dom";

const wrapperStyle = {
  fontFamily: "Robto",
  padding: ".05rem 0 .05rem 1rem",
  margin: "auto 0",
  float: "right",
};

const anchorStyle = {
  textDecoration: "none",
  backgroundColor: "none",
};

export default function NavBarLink(props) {
  Object.assign(wrapperStyle, props.style);
  const id = props.id;
  const className = props.className;
  return (
    <p className={className} style={wrapperStyle}>
      <Link id={id} className="nav-bar-link" style={anchorStyle} to={props.to}>{props.children}</Link>
    </p>
  );
}
