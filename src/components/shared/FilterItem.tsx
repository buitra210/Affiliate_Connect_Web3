import { Box, Typography } from "@mui/material";
type Props = {
  text: string;
  active?: boolean;
  onClick?: () => void;
};
export default function FilterItem({ text, active, onClick }: Props) {
  return (
    <Box
      sx={(theme) => ({
        borderRadius: 2,
        px: 2,
        py: 1.2,
        mr: 1,
        backgroundColor: active ? theme.palette.text.active2 : theme.palette.background.hover,
        cursor: "pointer",
      })}
      onClick={onClick}
    >
      <Typography
        variant="small"
        color={active ? "primary" : "text.active2"}
        fontWeight={500}
        sx={{ display: "flex", alignItems: "center", fontSize: "12px" }}
        noWrap
      >
        {text}
      </Typography>
    </Box>
  );
}
