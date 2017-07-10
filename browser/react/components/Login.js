"use strict";

import React from "react";

export default function Login({loginClickHandler}) {
  return (
    <form onSubmit={loginClickHandler} className="formGroup">
      <h1>Login</h1>
      <div className="formField">
        <input name="email" placeholder="example@example.com"/>
      </div>
      <div className="formField">
        <input name="password" placeholder="123"/>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
