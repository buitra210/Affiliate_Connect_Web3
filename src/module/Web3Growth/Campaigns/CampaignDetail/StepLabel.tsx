import { Box, Typography } from "@mui/material";

type Props = {
  stepIndex: number;
  currentStep: number;
  text: string;
};

export default function Steplabel({ currentStep, stepIndex, text }: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
      <Typography variant="small" color={"secondary"}>
        Step {stepIndex + 1}
      </Typography>
      <Typography textAlign={"left"} variant="body1" fontWeight={700} color={"primary"} mb={1}>
        {text}
      </Typography>
      {stepIndex < currentStep && (
        <Typography variant="small" color="text.success">
          Complete
        </Typography>
      )}
      {stepIndex === currentStep && (
        <Typography variant="small" color="text.active">
          In Progress
        </Typography>
      )}
      {stepIndex > currentStep && (
        <Typography variant="small" color={"secondary"}>
          Pending
        </Typography>
      )}
    </Box>
  );
}
