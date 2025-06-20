import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StepIconProps } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
export default function StepperIcon(props: StepIconProps) {
  const { completed } = props;
  return (
    <>
      {completed && <CheckCircleIcon fontSize="medium" sx={{ color: "#52B95F" }} />}
      {!completed && <RadioButtonUncheckedIcon fontSize="medium" sx={{ color: "text.active" }} />}
    </>
  );
}
