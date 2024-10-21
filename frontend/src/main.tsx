import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GoogleOauthCallbackView from "./views/auth/google/GoogleOauthCallbackView";
import MainView from "./views/MainView";
import { Provider } from "react-redux";
import { store } from "./stores";
import { CssVarsProvider, StyledEngineProvider } from "@mui/joy";
import { extendTheme } from "@mui/joy/styles";

const router = createBrowserRouter([
  { path: "/", element: <MainView /> },
  { path: "/auth/google/callback", element: <GoogleOauthCallbackView /> },
]);

const theme = extendTheme({ cssVarPrefix: "demo" });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider theme={theme}>
          <RouterProvider router={router} />
        </CssVarsProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
);
