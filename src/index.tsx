import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
//import reportWebVitals from "./reportWebVitals";

const rootDiv = document.getElementById("root");

if (!rootDiv) throw new Error("The root element is missing in index.html");

const root = ReactDOM.createRoot(rootDiv);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

//<React.StrictMode></React.StrictMode>
