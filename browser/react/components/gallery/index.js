import React from "react";

import { logError } from "../../../loggers";
import { fetchImages } from "../../../http";
import Gallery from "./gallery";
import infiniteScroll from "../../infiniteScroll";

// This must occur outside the render function so that the reference to the new component remains constant:
//https://facebook.github.io/react/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method
const ScrollingGallery = infiniteScroll(300)(Gallery);

export default class StatefulGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };

    this.fetchAdditionalPhotos = this.fetchAdditionalPhotos.bind(this);
  }

  componentDidMount() {
    this.fetchAdditionalPhotos()
      .catch(logError);
  }

  fetchAdditionalPhotos() {
    return fetchImages().then(photos => {
      if (photos.length === 0) return; // No additional photos from server
      this.setState(prevState => {
        return { photos: [...prevState.photos, ...this.formatPhotos(photos)] };
      });
    });
  }


  formatPhotos(photos) {
    return photos.map(photo => {
      return {
        id: photo.id,
        gallerySrc: "api-images/" + photo.gallery.fileName,
        thumbnailSrc: "api-images/" + photo.thumbnail.fileName,
        thumbnailWidth: photo.thumbnail.width,
        thumbnailHeight: photo.thumbnail.height
      };
    });
  }

  render() {
    const { photos } = this.state;
    const { clickHandler } = this.props;

    return (
      <ScrollingGallery
        columnMinWidth={150}
        columnMaxWidth={300}
        gutter={3}
        idealMargin={10}
        clickHandler={clickHandler}
        scrollHandler={this.fetchAdditionalPhotos.bind(this)}
        photos={photos}
      />
    );
  }
}