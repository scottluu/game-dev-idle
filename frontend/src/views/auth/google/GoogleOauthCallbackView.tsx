import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import useCookies from "../../../hooks/UseCookies";
import useEmail from "../../../hooks/UseEmail";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "../../../hooks/UseLocalStorage";
import UserSchema from "../../../schemas/UserSchema";
import useIsLoggedIn from "../../../hooks/UseIsLoggedIn";

const GoogleOauthCallbackView = () => {
  const renderAfterCalled = useRef(false);
  const { setIsLoggedIn } = useIsLoggedIn();
  const { email } = useEmail();
  let [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  if (code === null) return <Typography>Error: No code found</Typography>;
  const state = searchParams.get("state");
  useEffect(() => {
    if (renderAfterCalled.current) return;
    fetch(`/public-api/auth/google/callback?code=${code}`).then((response) =>
      response.json().then(() => {
        setIsLoggedIn(true);
      }),
    );
    renderAfterCalled.current = true;
  }, []);
  useEffect(() => {
    if (email !== null && email !== undefined) {
      console.log("Email: ", email);
      window.location.href = "/";
    }
  }, [email]);

  return <Typography>Login Complete! Redirecting...</Typography>;
};

export default GoogleOauthCallbackView;
