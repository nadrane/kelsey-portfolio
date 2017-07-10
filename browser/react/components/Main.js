"use strict";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Login";
import Gallery from "./Gallery";
import UploadPhoto from "./UploadPhoto";

import NavBar from "../UIComponents/NavBar";
import { fetchImages, postJSON, fetchJSON } from "../../http";
import { logError } from "../../loggers";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      photos: [],
    };
  }

  handleLoginClick(history, e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    postJSON('/api/auth/login', {email, password})
    .then(user => {
      this.setState({user});
      history.push('/');
    })
    .catch(logError);
  }

  getLoggedInUser() {
    return fetchJSON('/api/auth/me')
      .then(user => {
        this.setState({user});
      })
      .catch(logError);
  }

  componentDidMount() {
    return Promise.all([this.fetchAdditionalPhotos(), this.getLoggedInUser()])
      .catch(console.error.bind(console));

  }

  fetchAdditionalPhotos() {
    return fetchImages().then(photos => {
      if (photos.length === 0) return;  // No additional photos from server
      this.setState(prevState => {
        return { photos: [...prevState.photos, ...this.formatPhotos(photos)] };
      });
    });
  }

  formatPhotos(photos) {
    return photos.map(photo => {
      return {
        id: photo.id,
        gallerySrc: 'images/' + photo.gallery.fileName,
        thumbnailSrc: 'images/' + photo.thumbnail.fileName,
        thumbnailWidth: photo.thumbnail.width,
        thumbnailHeight: photo.thumbnail.height
      };
    });
  }

  render() {
    const wrapperStyle = {
      margin: "0 0.5rem 0.5rem 0.5rem",
    };

    return (
      <BrowserRouter>
        <div style={wrapperStyle} id="main">
          <NavBar user={this.state.user}/>
          <Switch>
            <Route path="/upload" component={UploadPhoto} />
            <Route path="/login" render={(props) => {
              return <Login loginClickHandler={this.handleLoginClick.bind(this, props.history)}/>;
            }}/>
            <Route render={() => {
              return <Gallery
                scrollHandler={this.fetchAdditionalPhotos.bind(this)}
                photos={this.state.photos}
              />;}}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
