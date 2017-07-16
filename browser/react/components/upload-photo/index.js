"use strict";

import React from "react";
import { postJSON } from "../../../http";
import Alert from "../../ui/alert";

import { fileInputLabel, uploadedPreview } from "./upload-photo.scss";
import "button.scss";
import "form.scss";
import "global.scss";

export default class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);

    // This sucks so much that the state needs to exist outside the Alert component.
    // Makes it clear why we use something like redux.
    this.state = {
      photo: null,
      message: "",
      type: ""
    };

    this.onAlertClose = this.onAlertClose.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  uploadHandler(e) {
    if (!e.target.files || !e.target.files[0]) return;

    var reader = new FileReader();

    reader.onload = e => {
      this.setState({
        photo: e.target.result,
        message: "",
        type: ""
      });
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  onAlertClose() {
    this.setState({
      message: "",
      type: ""
    });
  }

  displayUploadSuccess() {
    this.setState({
      message: "The photo uploaded successfully!",
      type: "success"
    });
    setTimeout(() => {
      this.setState({
        message: "",
        type: ""
      });
    }, 5000);
  }

  displayUploadError(message) {
    this.setState({
      message,
      type: "error"
    });
    setTimeout(() => {
      this.setState({
        message: "",
        type: ""
      });
    }, 5000);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.photo) {
      postJSON("/api/images", { data: this.state.photo })
        .then(() => {
          this.displayUploadSuccess();
          this.setState({
            photo: null
          });
        })
        .catch(() => {
          this.displayUploadError(
            "The photo failed to upload correctly. Please try again."
          );
        });
    } else {
      this.displayUploadError("Please upload a photo first");
    }
  }

  render() {
    const message = this.state.message;
    const type = this.state.type;
    const photo = this.state.photo;
    return (
      <form onSubmit={this.handleSubmit}>
        <Alert message={message} type={type} onClose={this.onAlertClose} />
        <fieldset>
          <label className={fileInputLabel} htmlFor="photo-uploader">
            Upload photo
          </label>
          <input
            id="photo-uploader"
            onChange={this.uploadHandler}
            name="photo"
            type="file"
            accept="image/*"
          />
          {photo ? <img className={uploadedPreview} src={photo} /> : null}
          <button type="submit">Confirm Photo</button>
        </fieldset>
      </form>
    );
  }
}
