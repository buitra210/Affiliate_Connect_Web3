import {
  useAppDispatch,
  useAppSelector,
  useForProjectCommonSelector,
} from "@centic-scoring/redux/hook";
import { compactNumber } from "@centic-scoring/utils/string/stringUtils";
import { Avatar, Box, Grid, Paper, Tooltip, Typography } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import NaValue from "@centic-scoring/components/NaValue";
import { useEffect, useMemo } from "react";
import { getSocialsSetting } from "@centic-scoring/redux/slices/setting/fetchFunctions";
import {
  DiscordIcon,
  TelegramIcon,
  TwitterIcon,
  GlobalIcon,
  SvgIconComponent,
} from "@centic-scoring/icons";
import { Link } from "@centic-scoring/components/primitives/Link";

const socials: Record<string, SvgIconComponent> = {
  twitter: TwitterIcon,
  telegram: TelegramIcon,
  discord: DiscordIcon,
};
export default function ProjectGeneralInfo() {
  const { project } = useForProjectCommonSelector();
  const { data } = useAppSelector((state) => state.setting.socialsMedia);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (project.data?.id) {
      dispatch(getSocialsSetting({ id: project.data.id }));
    }
  }, [dispatch, project]);

  const filteredDocs = useMemo(() => {
    return data?.docs
      .filter((doc) => Object.keys(socials).includes(doc.platform))
      .map((doc) => ({
        ...doc,
        icon: socials[doc.platform],
      }));
  }, [data?.docs]);

  return (
    <Box my={3}>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "background.primary",
                p: 3,
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              <Avatar src={project.data?.imgUrl} sx={{ width: "60px", height: "60px", mr: 2 }} />
              <Box>
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  {project.data?.name}
                </Typography>
                <Tooltip title={project.data?.description}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                    }}
                  >
                    {project.data?.description}
                  </Typography>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: { xs: 0, xsm: 4, md: 4, xl: 10 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  mb: 3,
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <PersonRoundedIcon sx={{ color: "text.active2", mr: 1 }} />
                    <Typography variant="body1" color="text.secondary" noWrap>
                      Monthly Active Users
                    </Typography>
                  </Box>
                  {project.data?.monthlyActiveUsers != null ? (
                    <Typography sx={{ fontSize: "32px", fontWeight: 600 }}>
                      {compactNumber(project.data?.monthlyActiveUsers)}
                    </Typography>
                  ) : (
                    <NaValue
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                  )}
                </Box>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <PersonAddAltRoundedIcon sx={{ color: "text.active2", mr: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      Followers
                    </Typography>
                  </Box>
                  {data?.totalFollowers != null ? (
                    <Typography sx={{ fontSize: "32px", fontWeight: 600 }}>
                      {compactNumber(data.totalFollowers)}
                    </Typography>
                  ) : (
                    <NaValue
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title={project.data?.name}>
                  <Link href={project.data?.website || ""}>
                    <GlobalIcon sx={{ color: "text.active2", mr: 2 }} />
                  </Link>
                </Tooltip>
                {filteredDocs?.map((item) => {
                  return (
                    <Tooltip
                      key={item.id}
                      title={
                        <Typography variant="extraSmall" sx={{ textTransform: "capitalize" }}>
                          {item.name}
                        </Typography>
                      }
                    >
                      <Link href={item.url}>
                        <item.icon
                          sx={{
                            "& path": {
                              fill: "#5185AA",
                            },
                            mr: 2,
                          }}
                        />
                      </Link>
                    </Tooltip>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h6" color="text.primary" my={3}>
        Detail Data
      </Typography>
      <Grid container spacing={3}></Grid>
      <Typography variant="h6" color="text.primary" mt={3}>
        Features
      </Typography>
    </Box>
  );
}
