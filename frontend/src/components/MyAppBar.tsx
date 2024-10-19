import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { AppBar, Toolbar, Typography } from "@mui/material";
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
      <MenuButton>Login via...</MenuButton>
      <Menu>
        <MenuItem onClick={handleGoogleLogin}>
          <GoogleIcon />
          Google
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1, minWidth: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MyAppBar;
