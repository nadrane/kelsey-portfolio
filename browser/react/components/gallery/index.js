import React from "react";
import Lightbox from "react-image-lightbox";

import { logError } from "../../../loggers";
import { definePaginationQuery } from "../../../http";
import Gallery from "./gallery";
import infiniteScroll from "../../infiniteScroll";
import { findIndex } from "lodash";

// This must occur outside the render function so that the reference to the new component remains constant:
//https://facebook.github.io/react/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method
const ScrollingGallery = infiniteScroll(300)(Gallery);

export default class StatefulGalleryAndLightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isLightboxOpen: false,
      currentPhotoIndex: 0,
      // This function closes over pagination state. It needs to be zeroed out and reset
      // if the component if ever unmonuted and remounted.
      fetchImages: definePaginationQuery("/api/images/"),
    };

    this.openLightbox = this.openLightbox.bind(this);
    this.incrementIndex = this.incrementIndex.bind(this);
    this.decrementIndex = this.decrementIndex.bind(this);
    this.fetchAdditionalPhotos = this.fetchAdditionalPhotos.bind(this);
  }

  componentDidMount() {
    this.fetchAdditionalPhotos();
  }

  openLightbox(e, photo) {
    const photoId = photo.id;
    this.setState(prevState => {
      const photoIndex = findIndex(prevState.photos, photo => photo.id === photoId);
      return {
        currentPhotoIndex: photoIndex,
        isLightboxOpen: true
      };
    });
  }

  incrementIndex() {
    const photosLength = this.state.photos.length;
    this.setState(prevState => {
      return {
        currentPhotoIndex: (prevState.currentPhotoIndex + photosLength + 1) % photosLength
      };
    });
  }

  decrementIndex() {
    const photosLength = this.state.photos.length;
    this.setState(prevState => {
      return {
        currentPhotoIndex: (prevState.currentPhotoIndex + photosLength - 1) % photosLength
      };
    });
  }

  getPhoto(index) {
    return this.state.photos[index] || {};
  }

  getCurrentPhoto() {
    return this.getPhoto(this.state.currentPhotoIndex);
  }

  getNextPhoto() {
    return this.getPhoto((this.state.currentPhotoIndex + 1) % this.state.photos.length);
  }

  getPrevPhoto() {
    return this.getPhoto((this.state.currentPhotoIndex - 1) % this.state.photos.length);
  }

  fetchAdditionalPhotos() {
    return this.state.fetchImages()
      .then(photos => {
        if (photos.length === 0) return; // No additional photos from server
        this.setState(prevState => {
          return { photos: [...prevState.photos, ...this.formatPhotos(photos)] };
        });
      })
      .catch(logError);
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
    const { photos, isLightboxOpen } = this.state;

    return (
      <div>
        <ScrollingGallery
          columnMinWidth={150}
          columnMaxWidth={300}
          gutter={3}
          idealMargin={10}
          clickHandler={this.openLightbox}
          scrollHandler={this.fetchAdditionalPhotos.bind(this)}
          photos={photos}
        />
        {isLightboxOpen &&
          <Lightbox
            enableZoom={false}
            discourageDownloads={true}
            mainSrc={this.getCurrentPhoto().gallerySrc}
            nextSrc={this.getNextPhoto().gallerySrc}
            prevSrc={this.getPrevPhoto().gallerySrc}
            nextSrcThumbnail={this.getNextPhoto().thumbnailSrc}
            prevSrcThumbnail={this.getPrevPhoto().thumbnailSrc}
            onCloseRequest={() => this.setState({ isLightboxOpen: false })}
            onMovePrevRequest={this.decrementIndex}
            onMoveNextRequest={this.incrementIndex}
          />}
      </div>
    );
  }
}
