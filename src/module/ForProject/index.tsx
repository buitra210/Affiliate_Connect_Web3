import { Box } from "@mui/material";
import StepForProject from "./StepForProject";
import Introduction from "@centic-scoring/components/Introduction";
import { useForProjectCommonSelector } from "@centic-scoring/redux/hook";

export default function ForProject() {
  const { projectCreated, project } = useForProjectCommonSelector();
  return (
    <Box>
      {!projectCreated && project.status !== "PROCESSING" && (
        <Introduction
          title="Welcome to Centic Web3 Growth"
          description="Unlock the mystery of Users and Token Holders' behavior in Web3 projects"
        />
      )}
      <StepForProject />
    </Box>
  );
}
