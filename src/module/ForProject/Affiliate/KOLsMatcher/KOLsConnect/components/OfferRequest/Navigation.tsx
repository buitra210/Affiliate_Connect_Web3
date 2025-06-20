import { Box, Button } from "@mui/material";
import useKOLsConnectparams from "../../hooks/useKOLsConnectParams";
import { toast } from "react-toastify";

export default function Navigation() {
  const { setStep, step, resetParam } = useKOLsConnectparams();
  const handleNext = () => {
    setStep(Math.min(step + 1, 4));
  };
  const handlePrev = () => {
    setStep(Math.max(step - 1, 1));
  };
  const handleUpgrade = () => {
    toast.info("Comming Soon");
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        justifyContent: "flex-end",
        "& .MuiButton-root": {
          minWidth: "120px",
        },
      }}
    >
      <Button variant="outlined" onClick={resetParam}>
        Cancel
      </Button>
      <Button variant="outlined" onClick={handlePrev}>
        Back
      </Button>
      {step < 4 && (
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      )}
      {step >= 4 && (
        <Button variant="contained" onClick={handleUpgrade}>
          Update
        </Button>
      )}
    </Box>
  );
}
