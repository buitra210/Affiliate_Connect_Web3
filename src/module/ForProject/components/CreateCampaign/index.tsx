import { Link } from "@centic-scoring/components/primitives/Link";
import ProjectStepComponent from "../ProjectStepComponent";
import { useForProjectCommonSelector } from "@centic-scoring/redux/hook";
import { useMemo } from "react";
import { Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function CreateCampaign() {
  const { project, projectCreated } = useForProjectCommonSelector();

  const disableStep2 = useMemo(() => {
    if (project.status === "SUCCESS" && projectCreated) {
      return false;
    }
    return true;
  }, [project, projectCreated]);
  return (
    <Box>
      <Link
        href={`/projects/campaigns/${project.data?.id}/create`}
        style={{ textDecoration: "none" }}
        onClick={(e) => {
          if (disableStep2) {
            e.preventDefault();
          }
        }}
      >
        <ProjectStepComponent
          step={2}
          title="Launch Marketing Campaign"
          content="Launch your marketing campaign on both Web2 and Web3 platform to grow your user and enhance user engagement with your DApp"
          disabled={disableStep2}
        />
      </Link>
      <Box sx={{ textAlign: "center", mb: -5, mt: -7.5, zIndex: 1 }}>
        <KeyboardArrowDownIcon
          sx={{
            fontSize: "7.25rem",
            color: `${disableStep2 ? "#6D8198" : "#29C4FF"}`,
            p: 0,
            position: "sticky",
          }}
        />
      </Box>
    </Box>
  );
}
