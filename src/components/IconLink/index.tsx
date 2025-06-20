import { Box, SxProps, Tooltip, TooltipProps } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  url?: string;
  title: ReactNode;
  newPage?: boolean;
  sx?: SxProps;
  placement?: TooltipProps["placement"];
};

export default function IconLink({ icon, title, url, newPage, sx, placement }: Props) {
  return (
    <Tooltip title={title} placement={placement || "top"}>
      <Box
        component={"a"}
        sx={{
          textDecoration: "none",
          borderRadius: "50%",
          color: "secondary.main",
          "& :hover": {
            color: "text.active2",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...(sx || {}),
        }}
        href={url}
        target={newPage ? "_blank" : "_self"}
      >
        {icon}
      </Box>
    </Tooltip>
  );
}
