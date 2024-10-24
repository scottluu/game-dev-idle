import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/joy";
import { useEffect, useRef } from "react";
import useEmail from "../../../hooks/UseEmail";
import useIsLoggedIn from "../../../hooks/UseIsLoggedIn";

const GoogleOauthCallbackView = () => {
  const renderAfterCalled = useRef(false);
  const { setIsLoggedIn } = useIsLoggedIn();
  const { email } = useEmail();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  if (code === null) return <Typography>Error: No code found</Typography>;
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
      window.location.href = "/";
    }
  }, [email]);

  return <Typography>Login Complete! Redirecting...</Typography>;
};

export default GoogleOauthCallbackView;
