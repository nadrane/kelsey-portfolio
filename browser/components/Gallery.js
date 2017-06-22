"use strict";

import React from "react";
import Gallery from "react-photo-gallery";
import Measure from "react-measure";

console.log('m', Measure)

function DynamicGallery({ photos }) {
  return (
    <Measure whitelist={["width"]}>
      {({ width }) => {
        console.log('w', width)
        let cols = 1;
        if (width >= 480) cols = 2;
        if (width >= 1024) cols = 3;
        if (width >= 1600) cols = 4;
        return <Gallery photos={photos} cols={cols} />;
      }}
    </Measure>
  );
}

export default DynamicGallery;