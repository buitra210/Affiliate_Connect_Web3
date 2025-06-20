import { IdeaIcon } from "@centic-scoring/icons";
import { useCommonDataSelector } from "@centic-scoring/redux/hook";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";

type CommentGraphProps = {
  text?: string;
};

export default function CommentGraph({ text }: CommentGraphProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const { exportMode } = useCommonDataSelector();
  const textRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (exportMode) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [exportMode]);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [text]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (!text) {
    return null;
  }

  return (
    <Box
      sx={{
        py: "18px",
        px: "18px",
        position: "relative",
        display: "flex",
        width: "100%",
        my: -1,
      }}
      className="graph-comment"
    >
      <IdeaIcon sx={{ fontSize: "16px", mr: 2 }} />
      <Typography
        ref={textRef}
        component="pre"
        color="text.label1"
        variant="body2"
        sx={{
          fontWeight: 500,
          whiteSpace: isExpanded ? "pre-wrap" : "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
          mr: 2,
        }}
      >
        {text}
        <Typography
          variant="body2"
          component="span"
          onClick={handleToggle}
          sx={{ cursor: "pointer", fontWeight: 500, color: "#009FDB" }}
        >
          {isExpanded && !exportMode ? "Short" : ""}
        </Typography>
      </Typography>
      {!isExpanded && isOverflowing && (
        <Typography
          width={isExpanded ? "0px" : "80px"}
          variant="body2"
          onClick={handleToggle}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
            fontWeight: 500,
            color: "#009FDB",
          }}
        >
          See More
        </Typography>
      )}
    </Box>
  );
}
