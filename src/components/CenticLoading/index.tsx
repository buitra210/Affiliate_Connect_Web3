import { Box, SxProps, Typography, TypographyProps } from "@mui/material";
import Image from "next/image";
import CenticLoadingGif from "public/centic_loading.gif";

export default function CenticLoading({
  size = 60,
  showTitle,
  title = "Loading data",
  titleProps,
  boxSx,
}: {
  size?: number;
  title?: string;
  showTitle?: boolean;
  titleProps?: TypographyProps;
  boxSx?: SxProps;
}) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        img: {
          width: size,
          height: size,
        },
        ...(boxSx && boxSx),
      }}
    >
      <Image priority src={CenticLoadingGif} alt="centic loading animation" />
      {showTitle && (
        <Typography fontWeight={500} variant="body2" mt={1} whiteSpace={"nowrap"} {...titleProps}>
          {title}
        </Typography>
      )}
    </Box>
  );
}
