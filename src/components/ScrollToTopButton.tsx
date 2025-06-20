"use client";

import { ArrowUpIcon } from "@centic-scoring/icons";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.screen.height) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      variant="contained"
      color="primary"
      component={"button"}
      disableElevation={false}
      sx={{
        position: "fixed",
        right: { xs: 16, sm: 40 },
        bottom: { xs: 16, sm: 40 },
        p: 1,
        borderRadius: "8px",
        width: 40,
        height: 40,
        minWidth: "fit-content",
        transition: "transform 250ms ease-out",
        "&.hidden": {
          opacity: 0,
          visibility: "hidden",
          transform: "scale(0)",
        },
        "&.show": {
          opacity: 1,
          visibility: "visible",
          transform: "scale(1)",
        },
      }}
      className={visible ? "show" : "hidden"}
      onClick={handleScrollToTop}
    >
      <ArrowUpIcon sx={{ color: "text.primary" }} />
    </Button>
  );
}
