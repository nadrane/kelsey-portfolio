"use strict";

import React from "react";
import { Redirect } from 'react-router';

import './login.scss';
import 'form.scss';
import 'global.scss';
import { btnPrimary } from 'button.scss';

export default function Login({ loginClickHandler, loggedIn }) {
  return (
    <div>
      {loggedIn ?
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
      : <Redirect to="/" />}
    </div>
  );
}
