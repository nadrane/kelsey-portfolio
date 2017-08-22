"use strict";

import React from "react";
import { Redirect } from "react-router";
import { postJSON } from "../../../http";
import composeClasses from "../../../composeClasses";

import { fileInputLabel, uploadedPreview } from "./upload-photo.scss";
import { btnPrimary, btnSecondary } from "button.scss";
import "form.scss";
import "global.scss";

export default class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
        photo: e.target.result,
        message: "",
        type: ""
      });
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  handleSubmit(e) {
    e.preventDefault();

    const displayError = this.props.displayError;
    const displaySuccess = this.props.displaySuccess;
    const photo = this.state.photo;

    if (photo) {
      postJSON("/api/images", { data: photo })
        .then(() => {
          displaySuccess("Your photo uploaded successfully!");
          this.setState({
            photo: null
          });
        })
        .catch(() => {
          displayError("The photo failed to upload. Please try again.");
        });
    } else {
      displayError("Please upload a photo first");
    }
  }

  render() {
    const { photo } = this.state;
    const { isAdmin } = this.props;
    console.log('ggg', this.props, this.state)
    return (
      <div>
        {isAdmin
          ? <form onSubmit={this.handleSubmit}>
              <fieldset>
                <label className={composeClasses(fileInputLabel, btnSecondary)} htmlFor="photo-uploader">
                  Upload photo
                </label>
                <input id="photo-uploader" onChange={this.uploadHandler} name="photo" type="file" accept="image/*" />
                {photo ? <img className={uploadedPreview} src={photo} /> : null}
                <button className={btnPrimary} type="submit">
                  Confirm Photo
                </button>
              </fieldset>
            </form>
          : <Redirect to="/" />}
      </div>
    );
  }
}
