import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App";
import { store } from "./redux/store";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.isdebrave-twitter-clone.shop"
    : "http://localhost:8080";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);
