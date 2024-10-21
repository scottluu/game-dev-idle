import {
  Box,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Stack,
} from "@mui/joy";
import { Typography } from "@mui/joy";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import useEmail from "../hooks/UseEmail";

type MyRedirect = {
  redirect_to: string;
};

const MyAppBar = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { email } = useEmail();
  const handleGoogleLogin = () => {
    fetch("/public-api/auth/google/login").then((value) =>
      value
        .json()
        .then(
          (_value: MyRedirect) => (window.location.href = _value.redirect_to),
        ),
    );
  };
  const loginComponents = (
    <>
      <MenuButton style={{ marginLeft: "5vw" }}>Login via...</MenuButton>
      <Menu>
        <MenuItem onClick={handleGoogleLogin}>
          <GoogleIcon />
          Google
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1, minWidth: "70vw" }}>
      <Sheet variant={"solid"} style={{ padding: "1rem" }}>
        <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
          <Typography level="h2" component="div">
            Game Dev Idle
          </Typography>
          <Dropdown
            open={isAccountMenuOpen}
            onOpenChange={() => setIsAccountMenuOpen((prevState) => !prevState)}
          >
            {email === null ? (
              loginComponents
            ) : (
              <Typography>{email}</Typography>
            )}
          </Dropdown>
        </Stack>
      </Sheet>
    </Box>
  );
};

export default MyAppBar;
