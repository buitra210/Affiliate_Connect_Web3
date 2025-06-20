import { Box, SxProps, Theme } from "@mui/material";
import { PropsWithChildren } from "react";

const editorStyle: SxProps<Theme> = (theme) => ({
  backgroundColor: "background.primary",
  borderRadius: 3,

  "& :focus": { border: "none" },
  "& .input-container": {
    minHeight: "100px",
    p: 1,
    caretShape: "block",
    tabSize: 1,
    outline: 0,
    caretColor: theme.palette.text.secondary,
  },
  "& a": {
    color: "text.active",
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
  },
  "& .text-container": {
    position: "relative",
    pb: "50px",
  },
  "& .text-placeholder": {
    position: "absolute",
    top: "24px",
    left: "10px",
    color: "text.secondary",
  },
  "& .toolbar-container": {
    position: "absolute",
    bottom: "-15px",
    right: "0px",
    backgroundColor: "background.primary",
    borderRadius: 2,
    "& .MuiIconButton-root": {
      color: "text.active2",
      borderRadius: "4px",
      ml: "5px",
      padding: "3px",
    },
    "& .MuiIconButton-root:hover": {
      color: "text.active",
      backgroundColor: "transparent",
    },
    "& .MuiIconButton-root.active": {
      color: "#FFFFFF",
      backgroundColor: "#009FDB80",
    },
  },
  "& .text-bold": {
    fontWeight: "bold",
  },
  "& .text-italic": {
    fontStyle: "italic",
  },
  "& .text-underline": {
    textDecoration: "underline",
  },
  "& .text-code": {
    backgroundColor: "#f0f2f5",
    padding: "1px 0.25rem",
    fontFamily: "Menlo, Consolas, Monaco, monospace",
  },
  "& .text-strikethrough": {
    textDecoration: "line-through",
  },
  "& .text-hashtag": {
    color: "text.active",
    fontWeight: 600,
  },
  "& blockquote": {
    px: 1,
    py: 1,
    mx: 1,
    borderRadius: 1,
    borderLeft: "6px solid #0EA5E9",
    backgroundColor: "#0EA5E91A",
  },
});

export default function StyleWraper({ children }: PropsWithChildren) {
  return <Box sx={editorStyle}>{children}</Box>;
}
