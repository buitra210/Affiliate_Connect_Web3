import { Box, Paper, Typography } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

type Props = {
  step: number;
  title: string;
  content: string;
  disabled?: boolean;
};

export default function ProjectStepComponent({ step, title, content, disabled }: Props) {
  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100,
          px: 4,
          py: 2,
          width: "100%",
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
          backgroundColor: `${disabled ? "#0E1317" : "background.paper"}`,
          "&:hover": {
            backgroundColor: `${disabled ? "" : "background.hover"}`,
          },
          "&:hover .moving-icon": {
            left: "calc(100% - 72px)",
          },
          minHeight: "150px",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                border: "2px solid #009FDB",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Typography variant="h4" fontWeight={700}>
                {step}
              </Typography>
            </Box>
            <Typography variant="h4">{title}</Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" pb={2}>
            {content}
          </Typography>
        </Box>
        <Box
          className="moving-icon"
          sx={{
            position: "absolute",
            top: "50%",
            left: "100%",
            transform: "translateY(-50%)",
            transition: "left 0.3s ease",
          }}
        >
          <ArrowCircleRightIcon sx={{ fontSize: "2.5rem", color: "#5D84A7" }} />
        </Box>
      </Paper>
    </Box>
  );
}
