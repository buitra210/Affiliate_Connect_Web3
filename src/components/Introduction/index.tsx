import { Box, Typography } from "@mui/material";

type Props = {
  title?: string;
  description?: string;
};
export default function Introduction({ description, title }: Props) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.header,
        borderRadius: 3,
        p: 4,
      })}
    >
      <Typography variant="h2" color="text.primary">
        {title}
      </Typography>
      <Typography variant="body1" my={1} color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}
