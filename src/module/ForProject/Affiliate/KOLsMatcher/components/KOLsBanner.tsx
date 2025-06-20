/* eslint-disable @next/next/no-img-element */
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export default function KOLsBanner({
  title,
  content,
  src,
}: {
  title: string;
  content: string;
  src: string;
}) {
  return (
    <Box>
      <Grid container sx={{ my: 2.2 }}>
        <Grid item xs={3} sm={5} md={6} sx={{ zIndex: 4 }}>
          <Box sx={{ minWidth: "400px", mt: { xs: 2, sm: 4 } }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "30px", md: "36px", sm: "32px" },
                color: "text.primary",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                fontSize: { xs: "16px", md: "22px", sm: "19px" },
                mt: 1,
                color: "text.primary",
                maxWidth: { xs: "60%", sm: "100%" },
              }}
            >
              {content}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={9} sm={7} md={6} sx={{ zIndex: 3 }}>
          <Box sx={{ mt: 1 }}>
            <img
              src={src}
              alt="affiliate"
              style={{
                height: "auto",
                width: "100%",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
