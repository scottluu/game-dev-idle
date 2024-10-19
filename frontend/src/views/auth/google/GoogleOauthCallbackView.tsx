import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import useCookies from "../../../hooks/UseCookies";
import useEmail from "../../../hooks/UseEmail";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "../../../hooks/UseLocalStorage";
import UserSchema from "../../../schemas/UserSchema";

const GoogleOauthCallbackView = () => {
  const renderAfterCalled = useRef(false);
  const { setter: setUser } = useLocalStorage<UserSchema>("user");
  const { email } = useEmail();
  let [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  if (code === null) return <Typography>Error: No code found</Typography>;
  const state = searchParams.get("state");
  useEffect(() => {
    if (renderAfterCalled.current) return;
    fetch(`/public-api/auth/google/callback?code=${code}`).then((response) =>
      response.json().then((value: OauthResponseSchema) => {
        console.log(JSON.stringify(value));
        const access_token = value.access_token;
        const decoded = jwtDecode(access_token);
        console.log(decoded.sub);
        if (decoded.sub === undefined) return;
        setUser({ email: decoded.sub });
      }),
    );
    renderAfterCalled.current = true;
  }, []);
  useEffect(() => {
    if (email !== null && email !== undefined) {
      console.log(email);
      window.location.href = "/";
    }
  }, [email]);

  return <Typography>Login Complete! Redirecting...</Typography>;
};

export default GoogleOauthCallbackView;
