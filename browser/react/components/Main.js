"use strict";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./login";
import UploadPhoto from "./upload-photo";
import Contact from "./contact";
import GalleryAndLightbox from './GalleryAndLightbox';
import Header from "../ui/header";
import Alert from "../ui/alert";

import { postJSON, fetchJSON } from "../../http";
import { logError } from "../../loggers";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  handleLoginClick(history, e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    postJSON('/services/auth/login', {email, password})
    .then(user => {
      this.setState({user});
      history.push('/');
    })
    .catch(logError);
  }

  getLoggedInUser() {
    return fetchJSON('/services/auth/me')
      .then(user => {
        this.setState({user});
      })
      .catch(logError);
  }

  componentDidMount() {
    return this.getLoggedInUser()
      .catch(logError);
  }

  render() {
    const { photos, user } = this.state;
    return (
      <BrowserRouter>
        <div id="main">
          <Switch>
             <Route path="/contact" component={Contact} />
            <Route path="/upload" component={UploadPhoto} />
            <Route path="/login" render={(props) => {
              const handleLoginClick = this.handleLoginClick.bind(this, props.history);
              return <Login loginClickHandler={handleLoginClick}/>;
            }}/>
            <Route render={() => {
              return (
                <div>
                  <Header user={user}/>
                  <GalleryAndLightbox />
                </div>
              );
            }}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
