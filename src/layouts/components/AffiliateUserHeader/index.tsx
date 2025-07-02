import { MenuIcon } from "@centic-scoring/icons";
import { useMediaQuery, Box, IconButton, Drawer, Theme, Typography } from "@mui/material";

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
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="background.paper" sx={{ ml: 2 }}>
          Connect Affiliate
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 2 }}>
            <KOLNotification />
          </Box>
          <Box sx={{ mr: 2, backgroundColor: "background.paper", borderRadius: 5 }}>
            <Navigation title=" For Project" newPage url="/projects/affiliate" />
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
