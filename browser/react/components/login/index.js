"use strict";

import React from "react";

import './login.scss';
import 'form.scss';
import 'global.scss';
import { btnPrimary } from 'button.scss';

export default function Login({ loginClickHandler }) {
  return (
    <form onSubmit={loginClickHandler} className="">
      <fieldset>
        <div>
          <input name="email" placeholder="email@gmail.com" />
        </div>
        <div>
          <input name="password" type="password" placeholder="password" />
        </div>
        <button className={btnPrimary} type="submit">Login</button>
      </fieldset>
    </form>
  );
}
