"use strict";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./login";
import UploadPhoto from "./upload-photo";
import Contact from "./contact";
import GalleryAndLightbox from './GalleryAndLightbox';
import NavBar from "../ui/nav-bar";
import Alert from "../ui/alert";

import { fetchImages, postJSON, fetchJSON } from "../../http";
import { logError } from "../../loggers";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      photos: [],
    };

    this.fetchAdditionalPhotos = this.fetchAdditionalPhotos.bind(this);
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
    return Promise.all([this.fetchAdditionalPhotos(), this.getLoggedInUser()])
      .catch(logError);

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
                  <NavBar user={user}/>
                  <GalleryAndLightbox
                    fetchAdditionalPhotos={this.fetchAdditionalPhotos}
                    photos={photos}/>
                </div>
              );
            }}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
