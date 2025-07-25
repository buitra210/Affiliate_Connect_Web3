import { Box, Container, Grid, Theme, useMediaQuery } from "@mui/material";
import { ReactNode, useEffect } from "react";
import Footer from "@centic-scoring/layouts/components/Footer";
import DesktopSidebar from "../components/DesktopSideBar";
import DesktopHeader from "../components/DesktopHeader";

import useForProjectSidebar from "../hooks/useForProjectLayout";
import { useAuthContext } from "@centic-scoring/context/auth-context";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import { setLayout } from "@centic-scoring/redux/slices/common";
import {
  resetForProjectState,
  setVirtualProject,
} from "@centic-scoring/redux/slices/for-project-common";
import { getUserProject } from "@centic-scoring/redux/slices/for-project-common/fetchFunctions";
import { useForProjectCommonSelector } from "@centic-scoring/redux/hook";

const ForProjectLayout = ({ children }: { children: ReactNode | undefined }) => {
  const { sidebar: forProjectSideBar } = useForProjectSidebar();
  const { isLoggedIn, handleOpenLogin, openLogin, userName } = useAuthContext();
  const { project } = useForProjectCommonSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLayout("For-project"));
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn !== undefined) {
      if (isLoggedIn) {
        // Try to get user project, but don't block if it fails
        dispatch(getUserProject());
      } else {
        dispatch(resetForProjectState());
        if (!openLogin) {
          handleOpenLogin();
        }
      }
    }
  }, [dispatch, isLoggedIn, handleOpenLogin, openLogin]);

  // 1 user = 1 project: Create virtual project if API doesn't return one
  useEffect(() => {
    if (
      isLoggedIn &&
      userName &&
      project.status === "SUCCESS" &&
      (!project.data?.id || Object.keys(project.data).length === 0)
    ) {
      dispatch(setVirtualProject({ userName }));
    }
  }, [dispatch, isLoggedIn, userName, project.status, project.data]);

  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.hover,
        pt: "78px",
        minHeight: "calc(100vh - 78px)",
      })}
    >
      <DesktopHeader />
      <Grid container>
        <Grid item xs={12} md={3} lg={2}>
          {!mdDown && <DesktopSidebar basePath="projects" configs={forProjectSideBar} />}
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
export default ForProjectLayout;
