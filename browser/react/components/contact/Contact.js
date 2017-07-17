import React from "react";

import { postJSON } from "../../../http";

import "button.scss";
import "form.scss";
import "global.scss";

const initialState = {
  name: "",
  email: "",
  message: ""
};

export default class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const displayError = this.props.displayError;
    const displaySuccess = this.props.displaySuccess;

    postJSON("/api/contact", this.state)
      .then(() => {
        displaySuccess("Your email was sent successfully");
        this.setState(initialState);
      })
      .catch(() => {
        displayError("The message failed to send correctly. Please try again.");
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="">
        <fieldset>
          <div>
            <input name="name" placeholder="your name" />
          </div>
          <div>
            <input name="email" placeholder="example@gmail.com" />
          </div>
          <div>
            <textarea name="message" placeholder="..." />
          </div>
          <button type="submit">send email</button>
        </fieldset>
      </form>
    );
  }
}
