import { SvgIconComponent, WarningIcon } from "@centic-scoring/icons";
import { Box, BoxProps, SvgIconProps, Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

interface FailedProps extends BoxProps {
  title: string;
  titleProps?: TypographyProps;
  detail?: string | ReactNode;
  ErrorIcon: SvgIconComponent;
  errorIconProps?: SvgIconProps;
  children?: ReactNode;
}

export default function Failed(props: FailedProps) {
  const { title, titleProps, detail, ErrorIcon, errorIconProps, children, ...other } = props;

  return (
    <Box textAlign="center" {...other}>
      <ErrorIcon
        color="error"
        {...errorIconProps}
        sx={{ fontSize: "2rem", mb: 1, ...errorIconProps?.sx }}
      />
      <Typography color="text.label1" gutterBottom {...titleProps}>
        {title}
      </Typography>
      {detail && (
        <Typography variant="body2" color="text.secondary">
          {detail}
        </Typography>
      )}
      {children && <Box mt={1}>{children}</Box>}
    </Box>
  );
}

Failed.defaultProps = {
  ErrorIcon: WarningIcon,
  title: "Something went wrong",
};
