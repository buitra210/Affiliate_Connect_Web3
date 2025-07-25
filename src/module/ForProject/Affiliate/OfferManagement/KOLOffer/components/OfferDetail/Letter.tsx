import TextEditor from "@centic-scoring/components/TextEditor";
import { CloseIcon } from "@centic-scoring/icons";
import { Box, Button, Dialog, IconButton, Paper, Typography } from "@mui/material";

export default function OfferLetter({
  open,
  handleClose,
  content,
}: {
  open: boolean;
  handleClose: () => void;
  content: string;
}) {
  return (
    <Dialog open={open} PaperProps={{ style: { maxWidth: "1000px" }, className: "hide-scrollbar" }}>
      <Paper sx={{ px: 5, py: 6, width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>
        <Typography variant="h2" my={6} sx={{ textAlign: "center" }}>
          Collaboration Invitation
        </Typography>
        <TextEditor onValueChange={() => {}} initValue={content} inputType="markdown" />
        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              "& .MuiButton-root": {
                minWidth: "130px",
              },
              gap: 1,
            }}
          >
            <Button variant="outlined">Copy</Button>
            <Button variant="contained">Send by</Button>
          </Box>
        </Box>
      </Paper>
    </Dialog>
  );
}
