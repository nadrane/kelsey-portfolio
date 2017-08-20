"use strict";

import React from "react";
import range from "./range";

import { gallery, image, photoWrapper } from "./gallery.scss";

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryWidth: 0
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.setState({
      galleryWidth: this._galleryDiv.clientWidth
    });

    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({
      galleryWidth: this._galleryDiv.clientWidth
    });
  }

  componentWillUpdate() {}

  getColumnWidth(columnMinWidth, gutter, idealMargin) {
    const { galleryWidth } = this.state;
    const numberOfColumns = this.getNumberOfColumns(columnMinWidth, gutter, idealMargin);
    const columnMaxWidth = columnMinWidth * 2;
    const computeMargin = columnWidth => galleryWidth - this.computeWidth(numberOfColumns, columnWidth, gutter);
    const distanceFromIdeal = column => Math.abs(column.margin - idealMargin);
    const bestMargin = (column1, column2) =>
      distanceFromIdeal(column1) > distanceFromIdeal(column2) ? column2 : column1;

    // TODO we can easily reduce this from O(N) to log(N) with a binary search of some sort
    let bestColumnWidth = {
      margin: Infinity,
      columnWidth: (columnMinWidth + columnMaxWidth) / 2
    };
    for (let columnWidth of range(columnMinWidth, columnMaxWidth)) {
      const margin = computeMargin(columnWidth);
      bestColumnWidth = margin > 0 ? bestMargin({ columnWidth, margin }, bestColumnWidth) : bestColumnWidth;
      // The margin will only get farther from the ideal after this point
      if (margin < idealMargin) break;
    }
    return bestColumnWidth.columnWidth;
  }

  getNumberOfColumns(columnWidth, gutter, margin) {
    const { galleryWidth } = this.state;

    // Sometimes when the DOM is initializing, the width of the element will be 0
    if (galleryWidth === 0) return 1;

    margin *= 2;
    const numberOfColumns = Math.floor((galleryWidth - margin) / (columnWidth + gutter));

    /* Because we round down, it's possible to have a zero columns acording to the above calculation. Obviously this is ridiculous. Remember that we calculate the number of columns
    using the maximum column width! This means that although for the maximum width, a single
    column might be too large, there still might (not really might but better be otherwise we need a wider column range) be a a column width within range that allows a single column to fit.
    */
    return numberOfColumns <= 0 ? 1 : numberOfColumns;
  }

  initializeColumnMinimums(numberOfColumns) {
    return new Array(numberOfColumns).fill(0);
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
    if (columnMinimums.length === 0) return 0;
    return Math.max(...columnMinimums);
  }

  updateColumnMiniums(photo, scalingFactor, gutter, columnMinimums) {
    const minimumColumnIndex = this.findMinimumColumnIndex(columnMinimums);
    columnMinimums[minimumColumnIndex] += Math.round(photo.thumbnailHeight * scalingFactor + gutter);
    return columnMinimums;
  }

  computeWidth(numberOfColumns, columnWidth, gutter) {
    if (numberOfColumns === 0) return 0;
    return numberOfColumns * columnWidth + (numberOfColumns - 1) * gutter;
  }

  render() {
    const gutter = this.props.gutter || 10;
    const columnMinWidth = this.props.columnMinWidth || 100;
    const idealMargin = this.props.idealMargin || 20;
    const { photos, clickHandler } = this.props;

    const numberOfColumns = this.getNumberOfColumns(columnMinWidth, gutter, idealMargin);

    const columnWidth = this.getColumnWidth(columnMinWidth, gutter, idealMargin);
    let columnMinimums = this.initializeColumnMinimums(numberOfColumns);

    const imgJSX = photos.map(photoToPlace => {
      let scalingFactor = columnWidth / photoToPlace.thumbnailWidth;
      const offset = this.getPhotoOffsetOfNextPhoto(columnMinimums, columnWidth, gutter);

      columnMinimums = this.updateColumnMiniums(photoToPlace, scalingFactor, gutter, columnMinimums);
      const style = {
        transform: `translateX(${offset.x}px) translateY(${offset.y}px)`,
        position: "absolute",
        top: 0,
        left: 0,
        width: columnWidth
      };
      return (
        <div key={photoToPlace.id} className={photoWrapper} style={style}>
          <img className={image} onClick={e => clickHandler(e, photoToPlace)} src={photoToPlace.thumbnailSrc} />
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
