"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import LogoImg from "public/centic_light_horizontal.png";

import { Link } from "@centic-scoring/components/primitives/Link";
import { StyledSub } from "../LandingPageLayout/Header";
import { foolterNavConfigs } from "../LandingPageLayout/nav.config";

function DesktopFooter() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      className="flex justify-between items-center"
    >
      <Box>
        <Link href={"/"}>
          <Image src={LogoImg} alt="centic's logo" width={144} />
        </Link>
        <Box sx={{ maxWidth: 404, mt: 3 }}>
          <Box sx={{ display: "flex", mb: 1.5 }}>
            <Link
              href={"/cookies-policy"}
              variant="small"
              color="text.active2"
              fontWeight={500}
              underline="hover"
              sx={{
                mr: 0.5,
                ":visited": {
                  color: "text.active2",
                },
              }}
            >
              Cookies Policy
            </Link>
            <Link
              href={"/privacy-policy"}
              variant="small"
              color="text.active2"
              fontWeight={500}
              underline="hover"
              sx={{ mx: 0.5 }}
            >
              Privacy Policy
            </Link>
            <Link
              href={"/terms-of-service"}
              variant="small"
              color="text.active2"
              fontWeight={500}
              underline="hover"
              sx={{ mx: 0.5 }}
            >
              Terms of Service
            </Link>
          </Box>
          <Typography variant="small" sx={{ color: "#97A8BC" }}>
            Copyright © {new Date().getFullYear()} Centic Inc. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box component="nav" sx={{ display: "flex", gap: { xs: 2, sm: 4 } }}>
          <Grid container spacing={2}>
            {foolterNavConfigs.map((nav) => (
              <Grid key={nav.id} item>
                <Typography variant="body1" fontWeight={600} color="text.active2">
                  {nav.title}
                </Typography>
                {nav.subPage?.map(
                  (item) =>
                    item.title && (
                      <StyledSub
                        key={item.id}
                        color="text.secondary"
                        href={item.href ? item.href : "#"}
                        target={item.isExternal ? "_blank" : "_self"}
                        sx={{
                          textDecoration: "none",
                          ":visited": {
                            color: "text.secondary",
                          },
                        }}
                      >
                        <Grid
                          item
                          key={item.id}
                          sx={{
                            minWidth: "110px",
                            px: 0,
                            minHeight: "14px",
                            height: "14px",
                            mt: 1.5,
                            mb: 1.5,
                          }}
                        >
                          {item.title}
                        </Grid>
                      </StyledSub>
                    )
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

function MobileFooter() {
  return (
    <Box>
      <Link href={"/"}>
        <Image src={LogoImg} alt="centic's logo" width={144} />
      </Link>
      <Box component="nav" sx={{ gap: 3, mt: 4, minWidth: "144px" }}>
        <Grid container spacing={2}>
          {foolterNavConfigs.map((nav) => (
            <Grid key={nav.id} item xs={12} xsm={6}>
              <Typography variant="subtitle2" fontWeight={600} color="text.active2">
                {nav.title}
              </Typography>
              {nav.subPage?.map(
                (item) =>
                  item.title && (
                    <StyledSub
                      key={item.id}
                      color="text.secondary"
                      href={item.href ? item.href : "#"}
                      target={item.isExternal ? "_blank" : "_self"}
                      sx={{
                        textDecoration: "none",
                        ":visited": {
                          color: "text.active2",
                        },
                      }}
                    >
                      <Grid
                        item
                        key={item.id}
                        sx={{
                          px: 0,
                          minHeight: "14px",
                          height: "14px",
                          mt: 1.5,
                          mb: 1.5,
                        }}
                      >
                        {item.title}
                      </Grid>
                    </StyledSub>
                  )
              )}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ maxWidth: 404, mt: 3 }}>
        <Box sx={{ display: "flex", mb: 1.5 }}>
          <Link
            href={"/cookies-policy"}
            variant="small"
            color="text.active2"
            fontWeight={500}
            underline="hover"
            sx={{ mr: 0.5 }}
          >
            Cookies Policy
          </Link>
          <Link
            href={"/privacy-policy"}
            variant="small"
            color="text.active2"
            fontWeight={500}
            underline="hover"
            sx={{ mx: 0.5 }}
          >
            Privacy Policy
          </Link>
          <Link
            href={"/terms-of-service"}
            variant="small"
            color="text.active2"
            fontWeight={500}
            underline="hover"
            sx={{ mx: 0.5 }}
          >
            Terms of Service
          </Link>
        </Box>
        <Typography variant="small" sx={{ color: "#97A8BC" }}>
          Copyright © {new Date().getFullYear()} Centic Inc. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default function Footer() {
  return (
    <Box component="footer" bgcolor="background.paper" sx={{ overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        >
          <MobileFooter />
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <DesktopFooter />
        </Box>
      </Container>
    </Box>
  );
}
