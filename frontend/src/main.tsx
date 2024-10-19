import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GoogleOauthCallbackView from "./views/auth/google/GoogleOauthCallbackView";
import MainView from "./views/MainView";

const router = createBrowserRouter([
  { path: "/", element: <MainView /> },
  { path: "/auth/google/callback", element: <GoogleOauthCallbackView /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
