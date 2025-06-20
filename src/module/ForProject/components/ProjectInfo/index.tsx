import { useForProjectCommonSelector } from "@centic-scoring/redux/hook";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProjectStepComponent from "../ProjectStepComponent";
import ProjectGeneralInfo from "./ProjectGeneralInfo";
import Failed from "@centic-scoring/components/Failed";
import CenticLoading from "@centic-scoring/components/CenticLoading";

export default function ProjectInfo() {
  const { project, projectCreated } = useForProjectCommonSelector();
  return (
    <Box>
      {((!projectCreated && project.status !== "PROCESSING") || project.status === "FAILED") && (
        <>
          <Box sx={{ py: 3 }}>
            <Typography variant="h4">You need follow these steps</Typography>
          </Box>
          <Link href={`/projects/create-project`} style={{ textDecoration: "none" }}>
            <Box>
              <ProjectStepComponent
                step={1}
                title="Explore your project's users"
                content="Unlock the mystery of Users and Token Holders’ Behavior in Web3 Projects"
              />
            </Box>
          </Link>
          <Box sx={{ textAlign: "center", mb: -5, mt: -7.5, zIndex: 1 }}>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: "7.25rem",
                color: "#29C4FF",
                p: 0,
                position: "sticky",
              }}
            />
          </Box>
        </>
      )}
      {project.status === "PROCESSING" && (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CenticLoading />
        </Box>
      )}
      {project.status === "SUCCESS" && projectCreated && <ProjectGeneralInfo />}
      {project.status === "FAILED" && (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Failed />
        </Box>
      )}
    </Box>
  );
}
