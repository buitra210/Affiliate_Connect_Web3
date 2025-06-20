import { SuccessIcon } from "@centic-scoring/icons";
import { Box, Button, Typography } from "@mui/material";

type Props = {
  onClick: () => void;
  text: string;
};
export default function SuccessDialog({ onClick, text }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: { xs: "260px", sm: "300px", md: "350px" },
      }}
    >
      <SuccessIcon
        sx={{
          width: "50px",
          height: "50px",
          mt: 1,
        }}
      />
      <Typography variant="h4" fontWeight={700} mt={3}>
        Congratulations
      </Typography>
      <Typography variant="body2" color={"text.active2"} mb={2} mt={1}>
        {text}
      </Typography>
      <Button fullWidth variant="contained" color="primary" onClick={onClick}>
        Confirm
      </Button>
    </Box>
  );
}
