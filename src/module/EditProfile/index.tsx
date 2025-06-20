import { Socials, SocialsType, editUserProfile } from "@centic-scoring/api/services";
import { StateStatus } from "@centic-scoring/components/component";
import { useYourProfileContext } from "@centic-scoring/context/page-context";
import {
  DiscordIcon,
  GitHubIcon,
  LinkedInIcon,
  TelegramIcon,
  TwitterIcon,
} from "@centic-scoring/icons";
import { toBase64 } from "@centic-scoring/utils/image/imageUtil";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Theme,
  Typography,
  SxProps,
  TextField,
} from "@mui/material";
import { ReactElement, useEffect, useRef, useState } from "react";
import ButtonWithNotiDialog from "@centic-scoring/components/Dialogs/ButtonWithNotiDialog";

const socalsEdit: {
  name: string;
  icon: ReactElement;
  key: SocialsType;
}[] = [
  {
    name: "Twitter",
    icon: <TwitterIcon fontSize="small" />,
    key: "twitter",
  },
  {
    name: "Github",
    icon: <GitHubIcon />,
    key: "github",
  },
  {
    name: "Discord",
    icon: <DiscordIcon fontSize="small" />,
    key: "discord",
  },
  {
    name: "Telegram",
    icon: <TelegramIcon />,
    key: "telegram",
  },
  {
    name: "Linkedin",
    icon: (
      <LinkedInIcon
        sx={{
          mb: 0.5,
        }}
        fontSize="small"
      />
    ),
    key: "linkedIn",
  },
];

const styleSocialTextfield: SxProps<Theme> = (theme: Theme) => ({
  "& input": {
    color: theme.palette.text.secondary,
  },
});

export default function EditProfile() {
  const { data } = useYourProfileContext();
  const imageInput = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [imageFile, setImageFile] = useState<File>();
  const [about, setAbout] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [socials, setSocials] = useState<Socials>({} as Socials);
  const [status, setStatus] = useState<StateStatus>("IDLE");

  const handleChangeSocials = (field: string, value: string) => {
    setSocials((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };
  const handleConfirm = async () => {
    setStatus("PROCESSING");
    try {
      await editUserProfile({
        displayName: displayName,
        about: about,
        socials: socials,
        ...(imageFile && {
          avatarImage: String(await toBase64(imageFile)),
        }),
        email: email,
      });
      setStatus("SUCCESS");
    } catch (error) {
      setStatus("FAILED");
    }
  };
  useEffect(() => {
    setAvatarUrl(data?.avatar);
    setAbout(data?.about);
    setDisplayName(data?.displayName);
    setSocials(data?.socials || {});
    setEmail(data?.email || "");
  }, [data]);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2.5,
        }}
      >
        <Typography variant="h1" color={"text.primary"}>
          Edit profile
        </Typography>
        <ButtonWithNotiDialog
          buttonText="Save"
          onClick={handleConfirm}
          status={status}
          dialogText="Edit profile successfully, check your mail box to confirm if you change email address."
        />
      </Box>
      {data && (
        <>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Avatar
                  src={avatarUrl}
                  sx={{
                    width: "119px",
                    height: "119px",
                    mb: 3,
                  }}
                  alt="user profile avatar"
                />
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  style={{ display: "none" }}
                  ref={imageInput}
                  onChange={async (e) => {
                    if (e?.target?.files?.length || 0 > 0) {
                      if (e?.target?.files) {
                        setImageFile(e.target.files[0]);
                        setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                      }
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    imageInput.current?.click();
                  }}
                >
                  Update Avatar
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Paper
                sx={{
                  p: 3,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <TextField
                    sx={{
                      mb: 2.5,
                      mr: 1,
                    }}
                    label="Display name"
                    fullWidth
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    inputProps={{
                      maxLength: 20,
                    }}
                  />
                  <TextField
                    type="email"
                    sx={{
                      mb: 2.5,
                      ml: 1,
                    }}
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <TextField
                  label="About"
                  fullWidth
                  multiline
                  rows={3}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  inputProps={{
                    maxLength: 300,
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
          <Paper
            sx={{
              p: 3,
              my: 2,
            }}
          >
            <Grid container spacing={2}>
              {socalsEdit.map((item) => {
                return (
                  <Grid item xs={12} xsm={6} key={item.key}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        placeholder={item.name}
                        value={socials[item?.key] || ""}
                        fullWidth
                        sx={styleSocialTextfield}
                        onChange={(e) => {
                          handleChangeSocials(item.key, e.target.value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <Box
                              sx={{
                                mr: 1,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {item.icon}
                            </Box>
                          ),
                        }}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </>
      )}
    </Box>
  );
}
