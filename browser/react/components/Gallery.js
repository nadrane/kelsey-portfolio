"use strict";

import React from "react";
import Photo from "./Photo";
import infiniteScroll from "./infinite-scroll";

function Gallery({photos}) {
  return (
    <div className="gallery">
      { photos.map(photo => <Photo key={photo.id} {...photo} />) }
    </div>
  );
}
export default infiniteScroll(300)(Gallery);