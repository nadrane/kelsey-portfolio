"use strict";

import React from "react";

import {gallery} from './gallery.scss';

function Gallery({ photos, openLightbox }) {
  return (
    <div className={gallery}>
      {photos.map(photo => {
        return (
          <img key={photo.id}
               onClick={openLightbox.bind(null, photo.id)}
               src={photo.thumbnailSrc}
               className="photo" />
        );
      })}
    </div>
  );
}
export default Gallery;
