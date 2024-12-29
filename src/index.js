import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// mounts the App component into DOM element
const wrapper = document.getElementById("react-entry");
if (wrapper) {
    ReactDOM.render(<App />, wrapper);
}
