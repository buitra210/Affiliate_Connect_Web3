import { FailIcon } from "@centic-scoring/icons";
import { Box, Button, Typography } from "@mui/material";

type Props = {
  onClick: () => void;
  text?: string;
};
export default function FailDialog({ onClick, text }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "260px",
      }}
    >
      <FailIcon
        sx={{
          width: "50px",
          height: "50px",
          mt: 1,
        }}
      />
      <Typography variant="h4" fontWeight={700} mt={3}>
        Error
      </Typography>
      <Typography variant="body2" color={"text.active2"} mb={2} mt={1}>
        {text || "An error occurred"}
      </Typography>
      <Button fullWidth variant="contained" color="primary" onClick={onClick}>
        Try again
      </Button>
    </Box>
  );
}
