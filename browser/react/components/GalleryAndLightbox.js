import React from "react";
import Gallery from "./gallery";
import Lightbox from "react-image-lightbox";
import infiniteScroll from "../infiniteScroll";
import _ from "lodash";

const ScrollingGallery = infiniteScroll(300)(Gallery);

export default class GalleryAndLightbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLightboxOpen: false,
      currentPhotoIndex: 0
    };

    this.openLightbox = this.openLightbox.bind(this);
    this.incrementIndex = this.incrementIndex.bind(this);
    this.decrementIndex = this.decrementIndex.bind(this);
  }

  incrementIndex() {
    const photosLength = this.props.photos.length;
    const newIndex =
      (this.state.currentPhotoIndex + photosLength + 1) % photosLength;
    this.setState({ currentPhotoIndex: newIndex });
  }

  decrementIndex() {
    const photosLength = this.props.photos.length;
    const newIndex =
      (this.state.currentPhotoIndex + photosLength - 1) % photosLength;
    this.setState({ currentPhotoIndex: newIndex });
  }

  getPhoto(index) {
    return this.props.photos[index] || {};
  }

  getCurrentPhoto() {
    return this.getPhoto(this.state.currentPhotoIndex);
  }

  getNextPhoto() {
    return this.getPhoto(
      (this.state.currentPhotoIndex + 1) % this.props.photos.length
    );
  }

  getPrevPhoto() {
    return this.getPhoto(
      (this.state.currentPhotoIndex - 1) % this.props.photos.length
    );
  }

  openLightbox(photoId) {
    this.setState((lastState, lastProps) => {
      const photoIndex = _.findIndex(
        lastProps.photos,
        photo => photo.id === photoId
      );
      return {
        currentPhotoIndex: photoIndex,
        isLightboxOpen: true
      };
    });
  }

  render() {
    const { photos, fetchAdditionalPhotos } = this.props;
    const { isLightboxOpen } = this.state;
    return (
      <div>
        <ScrollingGallery
          openLightbox={this.openLightbox}
          scrollHandler={fetchAdditionalPhotos}
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
