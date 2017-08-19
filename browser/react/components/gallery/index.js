import React from "react";

import { logError } from "../../../loggers";
import { fetchImages } from "../../../http";
import Gallery from "./gallery";
import infiniteScroll from "../../infiniteScroll";

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
    //const ScrollingGallery = infiniteScroll(300)(Gallery);
    const photos = this.state.photos;
    const clickHandler = this.props.clickHandler;
    // return (
    //   <ScrollingGallery
    //     columnMinWidth={100}
    //     columnMaxWidth={250}
    //     gutter={10}
    //     idealMargin={20}
    //     clickHandler={clickHandler}
    //     scrollHandler={this.fetchAdditionalPhotos.bind(this)}
    //     photos={photos}
    //   />
    // );
    return (
      <Gallery
        columnMinWidth={150}
        columnMaxWidth={300}
        gutter={3}
        idealMargin={20}
        clickHandler={clickHandler}
        photos={photos}
      />
    );
  }
}