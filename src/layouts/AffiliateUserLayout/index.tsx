import { Box, Container } from "@mui/material";
import AffiliateSidebar from "../components/AffiliateSidebar";
import { PropsWithChildren } from "react";
import KOLAuthContextProvider from "@centic-scoring/context/kol-auth-context";
import AffiliateUserHeader from "../components/AffiliateUserHeader";

export default function AffiliateUserLayout({ children }: PropsWithChildren) {
  return (
    <KOLAuthContextProvider>
      <Box
        sx={{
          backgroundColor: "background.primary",
          pt: "78px",
          minHeight: "calc(100vh - 78px)",
        }}
      >
        <AffiliateUserHeader />
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "initial",
              },
            }}
          >
            <AffiliateSidebar />
          </Box>
          <Box
            sx={{
              minHeight: "calc(100vh - 78px)",
              flexGrow: 1,
              marginLeft: { md: "250px", lg: "260px" },
            }}
          >
            <Container> {children}</Container>
          </Box>
        </Box>
      </Box>
    </KOLAuthContextProvider>
  );
}
