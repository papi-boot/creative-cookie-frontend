import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import GlobalDataProvider from "./context/GlobalData";
import App from "./App";
const root = document.querySelector("#root");

ReactDOM.render(
  <React.StrictMode>
    <Fragment>
      <GlobalDataProvider>
        <App />
      </GlobalDataProvider>
    </Fragment>
  </React.StrictMode>,
  root
);
