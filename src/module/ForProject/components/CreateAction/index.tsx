import { useForProjectCommonSelector } from "@centic-scoring/redux/hook";
import { useMemo } from "react";
import ProjectStepComponent from "../ProjectStepComponent";
import { Box } from "@mui/material";
import { Link } from "@centic-scoring/components/primitives/Link";

export default function CreateAction() {
  const { project, projectCreated } = useForProjectCommonSelector();

  const disableStep3 = useMemo(() => {
    if (
      project.status === "SUCCESS" &&
      projectCreated &&
      project.data &&
      project.data?.statistics?.allCampaigns > 0
    ) {
      return false;
    }
    return true;
  }, [project, projectCreated]);
  return (
    <Box>
      <Link
        href={`/projects/events/${project.data?.id}?createAction=true&actionTime=`}
        style={{ textDecoration: "none" }}
        onClick={(e) => {
          if (disableStep3) {
            e.preventDefault();
          }
        }}
      >
        <ProjectStepComponent
          step={3}
          title="Create Marketing Action"
          content="Execute or schedule your marketing actions on Web2 and Web3 platforms"
          disabled={disableStep3}
        />
      </Link>
    </Box>
  );
}
