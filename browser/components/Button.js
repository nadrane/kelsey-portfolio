import React from "react";

const defaultStyle = {
  fontFamily: "Robto",
  color: "rgba(0, 0, 0, 0.4)",
  fontSize: "20px",
  backgroundColor: "#2494ff",
  padding: "7px 12px",
  border: "none",
  borderRadius: "8px"
};

export default function Button(props) {
  const style = Object.assign({}, defaultStyle, props.style);
  return (
    <button style={style}>
      {props.children}
    </button>
  );
}
