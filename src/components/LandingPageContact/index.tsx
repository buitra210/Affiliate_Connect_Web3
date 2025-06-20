import { Link } from "@centic-scoring/components/primitives/Link";
import SocialStageImg from "public/images/social_stage.webp";
import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { ContactDiscordIcon, ContactLinkedInIcon, ContactTwitterIcon } from "@centic-scoring/icons";

export default function LandingPageContact() {
  return (
    <Container maxWidth="lg">
      <Box id="contact" component={"section"} pt={10} pb={15}>
        <SectionTitle title="Get In Touch" />
        <Typography
          variant="h4"
          component={"p"}
          fontWeight={400}
          align="center"
          color="secondary.main"
          maxWidth={522}
          mx={"auto"}
          mt={2}
          data-aos="fade-up"
        >
          Connect with our team of experts for personalized solutions and professional
          consultations.
        </Typography>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            href={"mailto:contact@centic.io"}
            target="_blank"
            size="large"
            variant="outlined"
            color="primary"
            sx={{ minWidth: 157 }}
            data-aos="fade-up"
          >
            Contact Us
          </Button>
        </Box>
        <Box
          sx={{
            mt: 7,
            maxWidth: 656,
            mx: "auto",
            width: "100%",
            ".stage": {
              width: "100%",
              height: "auto",
            },
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bottom: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 2, sm: 8 },
              ".social-btn": {
                transform: { xs: "scale(0.7)", sm: "scale(1)" },
                transition: "transform 250ms ease-out",
                "&:hover": {
                  sm: {
                    transform: "translateY(-8px) scale(1)",
                  },
                },
              },
            }}
          >
            <Tooltip title="Telegram">
              <Link
                className="social-btn"
                href="https://t.me/centic_io"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Image src="/images/telegram.png" alt="telegram" width={54} height={54} />
              </Link>
            </Tooltip>
            <Tooltip title="Twitter">
              <Link
                className="social-btn"
                href="https://twitter.com/centic_io"
                target="_blank"
                rel="noreferrer noopener"
              >
                {/* <Image src="/solution/images/twitter.png" alt="twitter" width={60} height={60} /> */}
                <ContactTwitterIcon sx={{ fontSize: "60px" }} />
              </Link>
            </Tooltip>
            <Tooltip title="Discord">
              <Link
                className="social-btn"
                href="https://discord.gg/Pk7wexpsmv"
                target="_blank"
                rel="noreferrer noopener"
              >
                {/* <Image src="/solution/images/discord.png" alt="discord" width={60} height={60} /> */}
                <ContactDiscordIcon sx={{ fontSize: "60px" }} />
              </Link>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <Link
                className="social-btn"
                href="https://www.linkedin.com/company/centic.io/"
                target="_blank"
                rel="noreferrer noopener"
              >
                {/* <Image src="/solution/images/linkedin.png" alt="linkedin" width={60} height={60} /> */}
                <ContactLinkedInIcon sx={{ fontSize: "60px" }} />
              </Link>
            </Tooltip>
          </Box>
          <Image src={SocialStageImg} alt="so" className="stage" />
        </Box>
      </Box>
    </Container>
  );
}
