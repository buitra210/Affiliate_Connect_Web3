import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { TwitterIcon } from "@centic-scoring/icons";
import { CloseIcon } from "@centic-scoring/icons";
import Link from "next/link";
import { Telegram } from "@mui/icons-material";

export default function ContactUs({ onClose, text }: { onClose: () => void; text?: string }) {
  return (
    <Paper
      sx={{
        minWidth: { xs: "300px", md: "546px" },
        minHeight: { xs: "200px", md: "200px" },
        px: 3.5,
        py: 3,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color={"text.secondary"}>
          Contact
        </Typography>
        <IconButton
          onClick={() => {
            onClose();
          }}
        >
          <CloseIcon sx={{ fontSize: "1rem", cursor: "pointer" }} />
        </IconButton>
      </Box>
      <Typography variant="body1" my={1} fontWeight={200}>
        {text || "For Partnership Proposal, please contact:"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          pt: 5.25,
        }}
      >
        <Typography variant="h6" fontWeight={700} color={"text.active"}>
          Ms. Wendy Doan |
        </Typography>
        <Typography variant="h6" fontWeight={300} color={"text.primary"} pl={1}>
          BD & Partnership
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyItems: "left",
          alignItems: "center",
          pt: 3.5,
          ".icon-className": {
            "&:hover": {
              "& path": {
                fill: "#E2EDFF",
              },
            },
            "& path": {
              fill: "#5185AA",
            },

            cursor: "pointer",
          },
        }}
      >
        <Tooltip title={`Telegram`} placement="top">
          <Link href="https://t.me/Wendy_Doann" target="_blank">
            <Telegram
              className="icon-className"
              sx={{
                mr: 1,
                fontSize: "2rem",
              }}
            />
          </Link>
        </Tooltip>
        <Tooltip title={`Twitter`} placement="top">
          <Link href="https://twitter.com/Wendy_Doann" target="_blank">
            <TwitterIcon
              className="icon-className"
              sx={{
                mx: 1,
                fontSize: "1.6rem",
              }}
            />
          </Link>
        </Tooltip>
      </Box>
    </Paper>
  );
}
