import React from "React";
import { Card } from "material-ui/Card";
import { GridList, GridTile } from "material-ui/GridList";
import Subheader from 'material-ui/Subheader';

const cardStyle = {
  width: "25%"
};

function Photos({ photos }) {
  return (
    <GridList cellHeight={350} cols={4}>
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