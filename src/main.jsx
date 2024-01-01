import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./Context/themeContext.jsx";
import { IsLoggedInContext } from "./Context/IsLoggedInContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IsLoggedInContext>
      <ThemeProvider>
        <RouterProvider router={routes}>
          <App />
        </RouterProvider>
      </ThemeProvider>
    </IsLoggedInContext>
    <ToastContainer />
  </React.StrictMode>
);
