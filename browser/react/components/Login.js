"use strict";

import React from "react";

export default function Login({ loginClickHandler }) {
  const formStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "20rem"
  };

  const inputStyle = {
    width: "100%",
  };

  const buttonStyle = {
    marginTop: ".2rem",
    width: "100%",
  };

  return (
    <form onSubmit={loginClickHandler} style={formStyle} className="pure-form pure-form-stacked">
      <legend>Login</legend>
      <fieldset>
        <div className="pure-control-group">
          <input style={inputStyle} name="email" placeholder="kelsey@gmail.com" />
        </div>
        <div className="pure-control-group">
          <input style={inputStyle} name="password" type="password" placeholder="password" />
        </div>
        <button style={buttonStyle} className="pure-button pure-button-primary" type="submit">Login</button>
      </fieldset>
    </form>
  );
}
