import { Box, Typography } from "@mui/material";
import { PropsWithChildren, useMemo, useRef, useState } from "react";

type Props = {
  defaultExanded?: boolean;
  shrinkHeight?: number;
};

export default function SeeMore({ children, shrinkHeight }: PropsWithChildren<Props>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const componentHeight = containerRef.current
    ? Number(getComputedStyle(containerRef.current).height?.replaceAll("px", ""))
    : 0;

  const shrinkedHeight = useMemo(() => {
    return shrinkHeight || 100;
  }, [shrinkHeight]);
  const [show, setShow] = useState(false);

  const hideable = useMemo(() => {
    if (containerRef.current) {
      return componentHeight > shrinkedHeight + 30;
    } else {
      return false;
    }
  }, [shrinkedHeight, componentHeight]);

  return (
    <Box>
      <Box
        sx={{
          height: show ? "auto" : `${shrinkHeight}px`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box ref={containerRef}>{children}</Box>
        {!show && hideable && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              // background: `linear-gradient(to bottom, rgba(255,0,0,0) ,rgba(255,0,0,0) , rgba(255,0,0,0) ,rgba(255,0,0,0) ,rgba(255,0,0,0) , rgba(255,0,0,0) ,rgba(255,0,0,0) ,rgba(255,0,0,0) , rgba(255,0,0,0) ,rgba(255,0,0,0) ,rgba(255,0,0,0) ,rgba(255,255,255,0.05),rgba(255,255,255,0.1), rgba(255,255,255,0.2))`,
              position: "absolute",
              left: "0px",
              top: "0px",
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          mb: 1,
          py: 0.5,
        }}
      >
        {!show && hideable && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Typography
              color={"text.active"}
              textAlign={"left"}
              fontWeight={500}
              variant="body1"
              onClick={(e) => {
                e.stopPropagation();
                setShow(true);
              }}
              pl={1}
            >
              See more
            </Typography>
          </Box>
        )}
        {show && hideable && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Typography
              variant="body1"
              color={"text.active"}
              textAlign={"left"}
              fontWeight={500}
              onClick={(e) => {
                e.stopPropagation();
                setShow(false);
              }}
            >
              See less
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
