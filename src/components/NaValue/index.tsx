import { Box, SxProps, Theme } from "@mui/material";

export default function NaValue({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Box
      component="span"
      sx={{
        bgcolor: "background.primary",
        px: 1,
        py: 0.5,
        lineHeight: 1,
        borderRadius: 1,
        fontSize: "1.25rem",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        ...(sx || {}),
      }}
    >
      --
    </Box>
  );
}
