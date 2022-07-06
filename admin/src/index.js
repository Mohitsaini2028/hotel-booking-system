import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import {AuthContextProvider} from "./context/AuthContext";


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
