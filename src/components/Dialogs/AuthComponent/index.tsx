import { useAuthContext } from "@centic-scoring/context/auth-context";
import { Box, Button, Dialog, MenuItem, Paper, Popover, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import LoginComponent from "../LoginComponent";
import RegisterComponent from "../RegisterComponent";
import { LoadingButton } from "@mui/lab";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailConfirm from "@centic-scoring/components/AuthenticationAccount/Email";
import ChangePassword from "../ChangePassword";

const AuthComponent = () => {
  const {
    isLoggedIn,
    logout,
    userName,
    status,
    verified,
    handleCloseLogin,
    handleCloseRegister,
    handleOpenLogin,
    handleOpenRegister,
    openLogin,
    openRegister,
  } = useAuthContext();
  const [openUserProfile, setOpenUserProfile] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenUserProfile(true);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setOpenUserProfile(false);
  };
  const handleLogout = () => {
    logout();
    handleCloseProfile();
  };

  return (
    <>
      <Dialog open={openLogin}>
        <LoginComponent handleOpenRegister={handleOpenRegister} handleClose={handleCloseLogin} />
      </Dialog>
      <Dialog open={openRegister}>
        <RegisterComponent handleOpenLogin={handleOpenLogin} handleClose={handleCloseRegister} />
      </Dialog>
      {isLoggedIn === false && (
        <>
          <Button variant="outlined" onClick={handleOpenLogin} sx={{ minWidth: "100px" }}>
            Login
          </Button>
          <Button
            sx={{
              ml: 1,
              minWidth: "100px",
            }}
            variant="contained"
            onClick={handleOpenRegister}
          >
            Sign up
          </Button>
        </>
      )}
      {isLoggedIn && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <LoadingButton
            sx={{ ml: 2 }}
            loading={status === "PROCESSING"}
            variant="outlined"
            onClick={handleOpenProfile}
          >
            {`Welcome, ${userName}`}
          </LoadingButton>
          <Popover
            anchorEl={anchorEl}
            open={openUserProfile}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            onClose={handleCloseProfile}
            slotProps={{
              paper: {
                style: {
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  transform: "translate(-8px,0px)",
                },
              },
            }}
          >
            <Paper sx={{ py: 1, borderRadius: 0, minWidth: "240px" }}>
              <Box sx={{ px: 2, py: 1, borderBottom: "1px solid rgba(0, 159, 219, 0.2)" }}>
                {verified && (
                  <Typography
                    variant="body2"
                    color="#15C381"
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <CheckCircleOutlineIcon fontSize="small" sx={{ mr: 0.6 }} /> Account verified
                  </Typography>
                )}
                {!verified && <EmailConfirm />}
              </Box>
              <MenuItem
                sx={{
                  height: "46px",
                }}
              >
                <Link
                  href={"/projects/profile"}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon sx={{ mr: 1, ml: -0.5 }} />
                  <Typography variant="body2" color={"text.secondary"}>
                    Your Profile
                  </Typography>
                </Link>
              </MenuItem>
              <ChangePassword />
              <MenuItem
                sx={{
                  height: "46px",
                }}
                onClick={handleLogout}
              >
                <LogoutIcon sx={{ mr: 1 }} />
                <Typography variant="body2" color={"text.secondary"}>
                  Log out
                </Typography>
              </MenuItem>
            </Paper>
          </Popover>
        </Box>
      )}
    </>
  );
};

export default AuthComponent;
