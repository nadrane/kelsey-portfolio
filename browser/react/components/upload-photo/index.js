"use strict";

import React from "react";
import { postJSON } from "../../../http";

import { fileInputLabel } from "./upload-photo.scss";
import "button.scss";
import "form.scss";

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
    postJSON("/api/images", { data: this.state.photo });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label className={fileInputLabel} htmlFor="photo-uploader">Upload photo</label>
          <input
            id="photo-uploader"
            onChange={this.uploadHandler}
            name="photo"
            type="file"
            accept="image/*"
          />
          <button type="submit">Confirm Photo</button>
          <img src={this.state.photo} />
        </fieldset>
      </form>
    );
  }
}
