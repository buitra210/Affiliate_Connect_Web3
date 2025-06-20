import { MetroChartBarIcon, SvgIconComponent } from "@centic-scoring/icons";
import { Box, Typography } from "@mui/material";

export default function NoData({
  color = "#2f3c45",
  text = "No Score",
  icon,
}: {
  color?: string;
  text?: string;
  icon?: SvgIconComponent;
}) {
  const RenderIcon = icon || MetroChartBarIcon;
  return (
    <Box
      className="no-data-container"
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <RenderIcon sx={{ fontSize: "2.5rem", color: color, mb: 1 }} />
      <Typography textAlign={"center"} color={color}>
        {text}
      </Typography>
    </Box>
  );
}
