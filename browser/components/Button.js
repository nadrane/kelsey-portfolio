import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginLeft: '0px',
  marginRight: '0px',
}

export default function Button(props) {
  return <RaisedButton style={style} {...props} />
}