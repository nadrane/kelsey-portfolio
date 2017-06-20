import React from "react";

function Photo({thumbnailSrc}) {
  return (
    <div className="photo">
      <img src={`${thumbnailSrc}`} />
    </div>
  )
}

export default Photo;