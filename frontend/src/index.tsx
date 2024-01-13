import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { store } from "./redux/store";

axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
