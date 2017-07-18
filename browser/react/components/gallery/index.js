"use strict";

import React from "react";

import { gallery, image, photoWrapper } from "./gallery.scss";

function Gallery({ photos, openLightbox }) {
  return (
    <div className={gallery}>
      {photos.map(photo => {
        return (
          <div key={photo.id} className={photoWrapper}>
            <img
              className={image}
              onClick={openLightbox.bind(null, photo.id)}
              src={photo.thumbnailSrc}
            />
          </div>
        );
      })}
    </div>
  );
}
export default Gallery;
