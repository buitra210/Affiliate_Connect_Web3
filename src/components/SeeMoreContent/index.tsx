import { useCommonDataSelector } from "@centic-scoring/redux/hook";
import { Box, SvgIconProps, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  text?: string;
  Icon?: React.FC<SvgIconProps>;
  row?: number;
};

// export default function SeeMoreContent({ text, Icon }: Props) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const { exportMode } = useCommonDataSelector();
//   useEffect(() => {
//     if (exportMode) {
//       setIsExpanded(true);
//     } else {
//       setIsExpanded(false);
//     }
//   }, [exportMode]);

//   const handleToggle = () => {
//     setIsExpanded(!isExpanded);
//   };
//   if (!text) {
//     return null;
//   }
//   return (
//     <Box
//       sx={{
//         py: "18px",
//         position: "relative",
//         display: "flex",
//         width: "100%",
//         my: -1,
//       }}
//       className="graph-comment"
//     >
//       {Icon && <Icon sx={{ fontSize: "16px", mr: 2 }} />}
//       <Typography
//         component="pre"
//         color="text.label1"
//         variant="body2"
//         sx={{
//           display: "-webkit-box",
//           fontWeight: 500,
//           whiteSpace: isExpanded ? "pre-wrap" : "nowrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           width: "100%",
//           mr: 2,
//           WebkitLineClamp: 3,
//           WebkitBoxOrient: "vertical",
//         }}
//       >
//         {text}
//         <Typography
//           variant="body2"
//           component="span"
//           onClick={handleToggle}
//           sx={{ cursor: "pointer", fontWeight: 500, color: "#009FDB" }}
//         >
//           {isExpanded && !exportMode ? "Short" : ""}
//         </Typography>
//       </Typography>
//       <Typography
//         width={isExpanded ? "0px" : "80px"}
//         variant="body2"
//         onClick={handleToggle}
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           cursor: "pointer",
//           fontWeight: 500,
//           color: "#009FDB",
//         }}
//       >
//         {!isExpanded && "See more"}
//       </Typography>
//     </Box>
//   );
// }

export default function SeeMoreContent({ text, Icon, row }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const { exportMode } = useCommonDataSelector();
  const textRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    setIsExpanded(!!exportMode);
  }, [exportMode]);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight || "20px");
      const maxLinesHeight = lineHeight * (row || 1);
      setIsTruncated(element.scrollHeight > maxLinesHeight);
    }
  }, [text, row]);

  const handleToggle = () => setIsExpanded(!isExpanded);

  if (!text) {
    return null;
  }

  return (
    <Box
      sx={{
        py: "18px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        flexWrap: "nowrap",
      }}
    >
      {Icon && <Icon sx={{ fontSize: "16px", mb: 2 }} />}
      <Typography
        ref={textRef}
        color="text.label1"
        variant="body2"
        component="pre"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: isExpanded ? "none" : row || 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          whiteSpace: "normal",
          textOverflow: "ellipsis",
          fontWeight: 500,
          lineHeight: "1.5",
        }}
      >
        {text}
      </Typography>
      {isTruncated && (
        <Typography
          variant="body2"
          // component="span"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          sx={{ cursor: "pointer", fontWeight: 500, color: "#009FDB" }}
        >
          {isExpanded ? "Short" : "See more"}
        </Typography>
      )}
    </Box>
  );
}
