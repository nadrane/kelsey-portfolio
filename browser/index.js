"use strict";

import ReactDOM from "react-dom";
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import Main from "./containers/Main";

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>,
  document.getElementById("app")
);
