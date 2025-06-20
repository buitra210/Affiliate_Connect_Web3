import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        pb: 3,
        pt: 5,
      }}
    >
      <Container maxWidth={"lg"} sx={{ paddingRight: "0px" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="small" color="#6D8198" align="right">
            Copyright © {new Date().getFullYear()} Affiliate-matcher. All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
