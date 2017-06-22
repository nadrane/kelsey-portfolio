import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../components/Login";
import NavBar from "../components/NavBar";
import Gallery from "../components/Gallery";
import { fetchImages } from "../utils";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loadingImages: false
    };
  }

  componentDidMount() {
    this.fetchAdditionalPhotos();
  }

  fetchAdditionalPhotos() {
    return fetchImages().then(photos => {
      this.setState({
        photos: [...this.state.photos, ...this.formatPhotos(photos)]
      });
    });
  }

  formatPhotos(photos) {
    return photos.map(photo => {
      return {
        id: photo.id,
        gallerySrc: "images/gallery/" + photo.path,
        thumbnailSrc: "images/thumbnail/" + photo.path,
        thumbnailWidth: photo.thumbnail.width,
        thumbnailHeight: photo.thumbnail.height
      };
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div id="main">
          <NavBar />
          <Switch>
            <Route path="/" render={() =>
                <Gallery
                  scrollHandler={this.fetchAdditionalPhotos.bind(this)}
                  photos={this.state.photos}
                />}
            />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
