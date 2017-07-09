"use strict";

import React from "react";
import infiniteScroll from "../infiniteScroll";

function Gallery({photos}) {
  return (
    <div className="gallery">
      { photos.map(photo => {
          return <img key={photo.id} src={photo.thumbnailSrc} className="photo" />;
        })
      }
    </div>
  );
}
export default infiniteScroll(300)(Gallery);