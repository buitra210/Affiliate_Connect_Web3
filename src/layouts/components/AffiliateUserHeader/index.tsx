import SearchInput from "@centic-scoring/components/SearchInput";
import { LogoIcon, LogoIconMobile, MenuIcon } from "@centic-scoring/icons";
import { useMediaQuery, Box, IconButton, Drawer, Theme } from "@mui/material";
import Link from "next/link";

import Navigation from "../Navigation";
import KOLSidebar from "../AffiliateSidebar";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";

import KOLNotification from "@centic-scoring/module/Affiliate/KOL/KOLNotification";
import AffiliateProfile from "@centic-scoring/components/AffiliateProfile";

export default function AffiliateUserHeader() {
  const isIpad = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { handleClose, handleOpen, open } = useDialogState();
  return (
    <Box
      sx={{
        position: "fixed",
        left: "0px",
        top: "0px",
        width: "100vw",
        py: 2,
        backgroundColor: "#030B10",
        zIndex: 99,
        overflowX: "auto",
      }}
      className="custom-scrollbar"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
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
            <Link href="/">
              <LogoIconMobile
                sx={{
                  fontSize: "2rem",
                  mx: 2,
                }}
              />
            </Link>
          </>
        )}
        <SearchInput />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 1 }}>
            <KOLNotification />
          </Box>
          <Box sx={{ mr: 1 }}>
            <Navigation title=" For Project" newPage url="/projects" />
          </Box>
          {/* <KOLProfile /> */}
          <AffiliateProfile />
          <Box sx={{ pr: { xs: 2, md: 3 }, ml: 4, display: "flex", alignItems: "center" }}>
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
                  <Box
                    sx={{
                      backgroundColor: "background.default",
                      position: "relative",
                      height: "100vh",
                      overflowY: "auto",
                    }}
                    className="hide-scrollbar"
                  >
                    <KOLSidebar />
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
