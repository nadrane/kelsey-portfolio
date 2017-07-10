"use strict";

import React from "react";
import { postJSON } from "../../http";

export default class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploaded: false,
      photo: null
    };

    this.uploadHandler = this.uploadHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  uploadHandler(e) {
    if (!e.target.files || !e.target.files[0]) return;

    var reader = new FileReader();

    reader.onload = e => {
      this.setState({
        photo: e.target.result
      });
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  handleSubmit(e) {
    e.preventDefault();
    postJSON(
      "/api/images",
      {data: this.state.photo}
    );
  }

  render() {
    const formStyle = {
      marginLeft: "auto",
      marginRight: "auto",
      width: "30rem"
    };

    const previewImageStyle = {
      marginTop: "1rem",
      maxWidth: "100%"
    };

    const inputStyle = {
      display: "inline-block"
    };

    return (
      <form
        onSubmit={this.handleSubmit}
        style={formStyle}
        className="pure-form pure-form-stacked"
      >
        <fieldset>
          <legend>Select a Photo</legend>
          <input
            style={inputStyle}
            onChange={this.uploadHandler}
            name="photo"
            type="file"
            accept="image/*"
          />
          <button type="submit" className="pure-button pure-button-primary">
            Confirm Photo
          </button>
          <img style={previewImageStyle} src={this.state.photo} />
        </fieldset>
      </form>
    );
  }
}
