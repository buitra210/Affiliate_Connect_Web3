import { DiscordIcon, LinkedInIcon, TelegramIcon, TwitterIcon } from "@centic-scoring/icons";
import { Box, Tooltip } from "@mui/material";
import Link from "next/link";
const contacts = [
  { name: "telegram", url: "https://t.me/centic_io", icon: TelegramIcon },
  { name: "twitter", url: "https://twitter.com/centic_io", icon: TwitterIcon },
  { name: "discord", url: "https://discord.gg/Pk7wexpsmv", icon: DiscordIcon },
  {
    name: "linkein",
    url: "https://www.linkedin.com/company/centic.io",
    icon: LinkedInIcon,
  },
];
export default function Contact() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        my: 1,
      }}
    >
      {contacts.map((item, index) => {
        return (
          <Tooltip key={index} title={`Centic ${item.name}`}>
            <Link
              href={item.url}
              target="_blank"
              style={{
                marginRight: "16px",
                ...(item.name === "twitter" && {
                  marginTop: "5px",
                }),
              }}
            >
              <item.icon
                sx={{
                  "&:hover": {
                    "& path": {
                      fill: "#5185AA",
                    },
                  },
                }}
                fontSize="small"
              />
            </Link>
          </Tooltip>
        );
      })}
    </Box>
  );
}
