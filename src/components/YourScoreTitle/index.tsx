import { BackIcon } from "../../icons";
import { Box, IconButton, Typography } from "@mui/material";

const YourScoreTitle = ({ name }: { name: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
      }}
    >
      <IconButton
        onClick={() => {
          history.back();
        }}
      >
        <BackIcon />
      </IconButton>
      <Typography color={"text.primary"} variant="h4" fontWeight={400}>
        {name}
      </Typography>
    </Box>
  );
};

export default YourScoreTitle;
