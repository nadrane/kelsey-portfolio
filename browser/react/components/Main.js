"use strict";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./login";
import UploadPhoto from "./upload-photo";
import Contact from "./contact";
import Gallery from "./Gallery";
import Header from "../ui/header";

import { postJSON, fetchJSON } from "../../http";
import { logError } from "../../loggers";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loggedIn: false
    };
  }

  handleLoginClick(history, e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    postJSON("/services/auth/login", { email, password })
      .then(user => {
        this.setState({
          user,
          loggedIn: true
        });
        history.push("/");
      })
      .catch(logError);
  }

  getLoggedInUser() {
    return fetchJSON("/services/auth/me")
      .then(user => {
        this.setState({
          user,
          loggedIn: true
        });
      })
      .catch(logError);
  }

  componentDidMount() {
    return this.getLoggedInUser().catch(logError);
  }

  render() {
    const { user, loggedIn } = this.state;
    const isAdmin = this.state.user.isAdmin;
    return (
      <BrowserRouter>
        <div id="main">
          <Switch>
            <Route path="/contact" component={Contact} />
            <Route
              path="/upload"
              render={_ => {
                return <UploadPhoto isAdmin={isAdmin} />;
              }}
            />
            <Route
              path="/login"
              render={props => {
                const handleLoginClick = this.handleLoginClick.bind(this, props.history);
                return <Login loginClickHandler={handleLoginClick} loggedIn={loggedIn} />;
              }}
            />
            <Route
              render={() => {
                return (
                  <div>
                    <Header user={user} />
                    <Gallery />
                  </div>
                );
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
