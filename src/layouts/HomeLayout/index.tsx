import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

import Footer from "../Footer";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.primary,
        pt: "78px",
        minHeight: "calc(100vh - 78px)",
      })}
    >
      {children}
      <Footer />
    </Box>
  );
}
