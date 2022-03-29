import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./assets/other/global.css";
import SimpleReactLightbox from "simple-react-lightbox";

import { AuthProvider } from "./context/auth"; 

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <SimpleReactLightbox>
        <App />
      </SimpleReactLightbox>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
