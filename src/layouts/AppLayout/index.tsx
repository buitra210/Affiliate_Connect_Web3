import { Box, Container, Grid, Theme, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import DesktopHeader from "../components/DesktopHeader";
import DesktopSidebar from "../components/DesktopSideBar";
import { sideBarConfig } from "../sidebar-configs/sidebarConfig";
import Footer from "../Footer";

const AppLayout = ({ children }: { children: ReactNode | undefined }) => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.primary,
        pt: "78px",
        minHeight: "calc(100vh - 78px)",
      })}
    >
      <DesktopHeader />
      <Grid container>
        <Grid item xs={12} md={3} lg={2}>
          {!mdDown && <DesktopSidebar configs={sideBarConfig} />}
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <Box
            sx={{
              minHeight: "calc(100vh - 78px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Container maxWidth="lg">{children}</Container>
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default AppLayout;
