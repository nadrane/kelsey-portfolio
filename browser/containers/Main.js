import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../components/Login";
import NavBar from "../components/NavBar";
import Gallery from "../components/Gallery";
import { fetchImages, postJSON, fetchJSON } from "../utils";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', this.props)
    this.state = {
      user: {},
      photos: [],
      loadingImages: false
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
    .catch(console.error.bind(console));
  }

  getLoggedInUser() {
    return fetchJSON('/api/auth/me')
      .then(user => {
        this.setState({user});
      });
  }

  componentDidMount() {
    return Promise.all([this.fetchAdditionalPhotos(), this.getLoggedInUser()])
      .catch(console.error.bind(console));

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
            <Route exact path="/" render={(props) => {
                console.log('gal props', props);
                return <Gallery
                  scrollHandler={this.fetchAdditionalPhotos.bind(this)}
                  photos={this.state.photos}
                />}}
            />
            <Route path="/login" render={(props) => {
              return <Login loginClickHandler={this.handleLoginClick.bind(this, props.history)}/>
            }}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
