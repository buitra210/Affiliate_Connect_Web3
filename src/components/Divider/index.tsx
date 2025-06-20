import { Box } from "@mui/material";

export default function Divider() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(284.34deg, rgba(7, 17, 24, 0.5) 7.96%, rgba(192, 219, 255, 0.5) 40.22%, rgba(7, 17, 24, 0.5) 71.67%)",
        width: "100%",
        height: "1px",
        transform: "translateX(-10%)",
      }}
    />
  );
}
