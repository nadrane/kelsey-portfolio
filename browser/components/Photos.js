"use strict";

import React from "react";
import { Card } from "material-ui/Card";
import { GridList, GridTile } from "material-ui/GridList";
import Subheader from 'material-ui/Subheader';

const cardStyle = {
  width: "25%"
};

function Photos({ photos }) {
  return (
    <GridList cellHeight={250} cols={3} width={"50%"}>
      <Subheader>December</Subheader>
      {photos.map(photo => (
        <GridTile key={photo.id}>
          <img src={`/images/${photo.path}`}/>
        </GridTile>
      ))}
    </GridList>
  );
}

export default Photos;
    // <Card key={photo.id} style={cardStyle}>
    //         <img src={`/images/${photo.path}`} />
    //       </Card>