import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { Router, browserHistory } from "react-router";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
