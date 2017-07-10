import React from 'react';

const style = {
  marginLeft: '0px',
  marginRight: '0px',
};

export default function Button(props) {
  return <RaisedButton style={style} {...props} />;
}