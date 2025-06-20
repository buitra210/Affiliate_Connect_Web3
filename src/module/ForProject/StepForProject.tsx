import { Box } from "@mui/material";
import ProjectInfo from "./components/ProjectInfo";
import CreateCampaign from "./components/CreateCampaign";
import CreateAction from "./components/CreateAction";
import { useEffect } from "react";
import { getUserProject } from "@centic-scoring/redux/slices/for-project-common/fetchFunctions";
import { useAppDispatch, useForProjectCommonSelector } from "@centic-scoring/redux/hook";

export default function StepForProject() {
  const { projectCreated } = useForProjectCommonSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (projectCreated) {
      dispatch(getUserProject());
    }
  }, [dispatch, projectCreated]);

  return (
    <Box>
      <ProjectInfo />
      <CreateCampaign />
      <CreateAction />
    </Box>
  );
}
