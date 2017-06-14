"use strict";

import ReactDOM from "react-dom";
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import App from "./containers/App";

injectTapEventPlugin();

const AppWrapper = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(
  <AppWrapper />,
  document.getElementById("app")
);
