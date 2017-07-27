"use strict";

import React from "react";
import { range, debounce } from "lodash";

import { gallery, image, photoWrapper } from "./gallery.scss";

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfColumns: 0
    };
    this.handleResize = debounce(this.handleResize.bind(this), 100, {
      leading: true
    });
  }

  componentDidMount() {
    this.setState({
      numberOfColumns: this.getNumberOfColumns(this.props.columnWidth)
    });
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    console.log("resizing");
    this.setState({
      numberOfColumns: this.getNumberOfColumns(this.props.columnWidth)
    });
  }

  componentWillUpdate() {}

  getNumberOfColumns(columnWidth) {
    console.log("client width", this._galleryDiv.clientWidth);
    console.log(
      "col count",
      Math.floor(this._galleryDiv.clientWidth / columnWidth)
    );
    return Math.floor(this._galleryDiv.clientWidth / columnWidth);
  }

  initializeColumnMinimums(numberOfColumns) {
    return range(numberOfColumns).map(_ => 0);
  }

  getPhotoOffsetOfNextPhoto(columnMinimums, columnWidth, gutter) {
    const minimumColumnIndex = this.findMinimumColumnIndex(columnMinimums);
    return {
      x: minimumColumnIndex * columnWidth + minimumColumnIndex * gutter,
      y: columnMinimums[minimumColumnIndex] + gutter
    };
  }

  findMinimumColumnIndex(columnMinimums) {
    return columnMinimums.indexOf(Math.min(...columnMinimums));
  }

  findMaxColumnHeight(columnMinimums) {
    return Math.max(...columnMinimums);
  }

  updateColumnMiniums(photo, scalingFactor, gutter, columnMinimums) {
    const minimumColumnIndex = this.findMinimumColumnIndex(columnMinimums);
    columnMinimums[minimumColumnIndex] += Math.round(
      photo.thumbnailHeight * scalingFactor + gutter
    );
    return columnMinimums;
  }

  computeWidth(numberOfColumns, columnWidth, gutter) {
    return numberOfColumns * columnWidth + (numberOfColumns - 1) * gutter;
  }

  render() {
    const gutter = this.props.gutter || 10;
    const columnWidth = this.props.columnWidth || 400;
    const photos = this.props.photos;
    const numberOfColumns = this.state.numberOfColumns;
    const clickHandler = this.props.clickHandler;
    let columnMinimums = this.initializeColumnMinimums(numberOfColumns);

    const imgJSX = photos.map(photoToPlace => {
      let scalingFactor = columnWidth / photoToPlace.thumbnailWidth;
      const offset = this.getPhotoOffsetOfNextPhoto(
        columnMinimums,
        columnWidth,
        gutter
      );

      columnMinimums = this.updateColumnMiniums(
        photoToPlace,
        scalingFactor,
        gutter,
        columnMinimums
      );
      //console.log("cols", columnMinimums);
      const style = {
        transform: `translateX(${offset.x}px) translateY(${offset.y}px)`,
        position: "absolute",
        top: 0,
        left: 0,
        width: columnWidth
      };
      return (
        <div key={photoToPlace.id} className={photoWrapper} style={style}>
          <img
            className={image}
            onClick={e => clickHandler(e, photoToPlace.id)}
            src={photoToPlace.thumbnailSrc}
          />
        </div>
      );
    });
    const galleryStyle = {
      height: this.findMaxColumnHeight(columnMinimums),
      width: this.computeWidth(numberOfColumns, columnWidth, gutter)
    };
    return (
      <div ref={gallery => (this._galleryDiv = gallery)}>
        <div style={galleryStyle} className={gallery}>
          {imgJSX}
        </div>
      </div>
    );
  }
}
