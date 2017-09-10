import React from "react";

import { postJSON } from "../../../http";

import { btnPrimary } from "button.scss";
import { error } from "../../../../assets/stylesheets/error.scss";
import "form.scss";
import "global.scss";

const initialState = {
  name: { value: "", dirty: false, afterBlur: false, error: "" },
  email: { value: "", dirty: false, afterBlur: false, error: "" },
  message: { value: "", dirty: false, afterBlur: false, error: "" }
};

const emptyErrors = {
  name: "Please fill out your name",
  email: "Please fill out your email address",
  message: "Please include a message"
};

export default class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validations = [
      this.isEmailFilled,
      this.isNameFilled,
      this.isMessageFilled,
      this.isEmailValid
    ];
  }

  isEmailValid() {
    const email = this.state.email.value;
    return email.indexOf(".") !== -1 && email.indexOf("@") !== -1;
  }

  isNameFilled() {
    return this.state.name.value === "";
  }

  isEmailFilled() {
    return this.state.email.value === "";
  }

  isMessageFilled() {
    return this.state.message.value === "";
  }

  isFormValid() {
    return this.validations.every(validation => validation.call(this));
  }

  isButtonDisabled() {
    return !this.isFormValid();
  }

  showNameError() {
    return this.state.name.dirty && this.state.name.afterBlur && this.state.name.error !== "";
  }

  showEmailError() {
    return this.state.email.dirty && this.state.email.afterBlur && this.state.email.error !== "";
  }

  showMessageError() {
    return (
      this.state.message.dirty && this.state.message.afterBlur && this.state.message.error !== ""
    );
  }

  handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    let error = "";

    if (e.target.value === "") {
      error = emptyErrors[field];
    }

    if (field === "email") {
      if (value !== "" && !this.isEmailValid()) {
        error = "Please enter a valid email";
      }
    }

    this.setState(prevState => {
      return {
        [field]: {
          value: value,
          dirty: true,
          afterBlur: prevState[field].afterBlur,
          error
        }
      };
    });
  }

  handleBlur(e) {
    const field = e.target.name;
    const value = e.target.value;
    let error = "";

    if (e.target.value === "") {
      error = emptyErrors[field];
    }

    if (field === "email") {
      if (value !== "" && !this.isEmailValid()) {
        error = "Please enter a valid email";
      }
    }

    this.setState(prevState => {
      return {
        [field]: {
          value: value,
          dirty: prevState[field].dirty,
          afterBlur: true,
          error
        }
      };
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const displayError = this.props.displayError;
    const displaySuccess = this.props.displaySuccess;

    const message = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    postJSON("/services/email", message)
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
            <input
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              name="name"
              placeholder="your name"
            />
            {this.showNameError() &&
              <span className={error}>
                {this.state.name.error}
              </span>}
          </div>
          <div>
            <input
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              name="email"
              placeholder="example@gmail.com"
            />
            {this.showEmailError() &&
              <span className={error}>
                {this.state.email.error}
              </span>}
          </div>
          <div>
            <textarea
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              name="message"
              placeholder="..."
            />
            {this.showMessageError() &&
              <span className={error}>
                {this.state.message.error}
              </span>}
          </div>
          <button disabled={!this.isButtonDisabled()} className={btnPrimary} type="submit">
            SEND EMAIL
          </button>
        </fieldset>
      </form>
    );
  }
}
