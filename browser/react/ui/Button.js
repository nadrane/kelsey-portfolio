"use strict";

import React from "react";

const defaultStyle = {
  fontFamily: "Robto",
  color: "rgba(0, 0, 0, 0.4)",
  fontSize: "20px",
  backgroundColor: "rgba(94, 54, 54, 0.38)",
  padding: "5px 3px",
  border: "none",
  borderRadius: "8px"
};

export default function Button(props) {
  const style = Object.assign({}, defaultStyle, props.style);
  const className = props.className;
  return (
    <button className={className} style={style}>
      {props.children}
    </button>
  );
}
