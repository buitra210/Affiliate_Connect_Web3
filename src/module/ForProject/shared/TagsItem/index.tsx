import { Box, Typography } from "@mui/material";

type Props = {
  tag: string;
};
export default function TagsItem({ tag }: Props) {
  return (
    <Box key={tag} className="filter-item">
      <Typography
        sx={{ display: "flex", alignItems: "center" }}
        variant="small"
        color="text.active2"
      >
        {tag}
      </Typography>
    </Box>
  );
}
