import React from "react";

import Alert from "./index";

const initialState = {
  message: "",
  type: ""
};

export default function(InnerComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = initialState;
      this.timeoutId = -1;
      this.onAlertClose = this.onAlertClose.bind(this);
      this.displayError = this.displayError.bind(this);
      this.displaySuccess = this.displaySuccess.bind(this);
    }

    onAlertClose() {
      this.setState({
        message: "",
        type: ""
      });
    }

    display(message) {
      this.setState({
        message
      });
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.setState(initialState);
      }, 5000);
    }

    displaySuccess(message) {
      this.display(message);
      this.setState({ type: "success" });
    }

    displayError(message) {
      this.display(message);
      this.setState({ type: "error" });
    }

    render() {
      const message = this.state.message;
      const type = this.state.type;
      return (
        <div>
          <Alert message={message} type={type} onClose={this.onAlertClose} />
          <InnerComponent
            displaySuccess={this.displaySuccess}
            displayError={this.displayError}
          />
        </div>
      );
    }
  };
}
