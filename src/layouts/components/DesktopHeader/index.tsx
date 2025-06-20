import { LogoIcon, LogoIconMobile } from "../../../icons";
import { Box, IconButton, Theme, useMediaQuery, Drawer } from "@mui/material";
import { MenuIcon } from "@centic-scoring/icons";
import { useState } from "react";
import Link from "next/link";
import AuthComponent from "@centic-scoring/components/Dialogs/AuthComponent";
import MobileSidebar from "../MobileSidebar";
import useForProjectSidebar from "@centic-scoring/layouts/hooks/useForProjectLayout";
import ProjectNotification from "@centic-scoring/module/ForProject/components/ProjectNotification";

export default function DesktopHeader() {
  const isIpad = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const { sidebar: forProjectSideBar } = useForProjectSidebar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        left: "0px",
        top: "0px",
        width: "100vw",
        py: 2,
        backgroundColor: "#0A1116",
        zIndex: 99,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!isIpad && (
          <Link href="/">
            <LogoIcon
              sx={{
                width: "111px",
                height: "40px",
                mx: 2,
              }}
            />
          </Link>
        )}
        {isIpad && (
          <>
            <Link href="/projects">
              <LogoIconMobile
                sx={{
                  fontSize: "2rem",
                  mx: 2,
                }}
              />
            </Link>
          </>
        )}
        <Box sx={{ pr: { xs: 2, md: 3 }, display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 2 }}>
            <ProjectNotification />
          </Box>
          <Box
            mr={2}
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            {/* <Navigation title="Growth Intelligence" url="/web3-growth" /> */}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AuthComponent />
            {isIpad && (
              <>
                <IconButton onClick={handleOpen}>
                  <MenuIcon
                    fontSize="small"
                    color="secondary"
                    sx={{ cursor: "pointer", ml: 0.5 }}
                  />
                </IconButton>
                <Drawer onClose={handleClose} open={open} anchor="right">
                  <Box sx={{ height: "100%" }}>
                    <MobileSidebar
                      configs={forProjectSideBar}
                      basePath="projects"
                      navigation={[
                        {
                          title: "Growth Intelligence",
                          path: "/web3-growth",
                          auth: false,
                          inactiveHideSubTab: true,
                          showId: true,
                        },
                      ]}
                      onClose={handleClose}
                    />
                  </Box>
                </Drawer>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
