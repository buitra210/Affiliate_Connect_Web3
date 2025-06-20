import Contact from "@centic-scoring/components/Contact";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import useAffiliateLayout from "@centic-scoring/layouts/hooks/useAffiliateLayout";
import { SidebarConfigItem } from "@centic-scoring/layouts/sidebar-configs/sidebarConfig";
import { Box, Link, SxProps, Theme, Typography } from "@mui/material";
import { useRouter } from "next/router";

//style
// eslint-disable-next-line no-unused-vars
const sideBarItem: SxProps<Theme> = (theme: Theme) => ({
  textTransform: "none",
  textAlign: "left",
  pl: 2,
  py: 1.5,
  maxWidth: "280px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
});

export default function AffiliateSidebar() {
  const { config } = useAffiliateLayout();
  const router = useRouter();
  return (
    <Box
      sx={{
        position: "fixed",
        minWidth: { md: "250px", lg: "260px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "calc(100vh - 80px)",
        borderRight: "1px solid #16242E",
      }}
    >
      {
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {config.map((item, index: number) => {
              const base = "/";
              const itemPath = `${item.path}`;
              const isActive =
                (itemPath === base && itemPath === router.asPath) ||
                (itemPath !== base && router.asPath.includes(itemPath));

              return (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    opacity: item.disabled ? 0.7 : 1,
                  }}
                >
                  {!item.subTab && <NormalTab tabData={item} isLoggedIn active={isActive} />}
                  {item.subTab && <TabWithSubMenu tabData={item} isLoggedIn active={isActive} />}
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              pl: 3,
            }}
          >
            <Contact />
          </Box>
        </>
      }
    </Box>
  );
}

const TabWithSubMenu = ({
  tabData,
  active,
  isLoggedIn,
}: {
  tabData: SidebarConfigItem;
  isLoggedIn?: boolean;
  active?: boolean;
}) => {
  const router = useRouter();
  const { id } = useURLQuery();
  return (
    <Box
      sx={{
        width: "100%",
        transition: "all 2s linear 1s",
        boxShadow: "0px 0px 10px 0px rgba(63, 198, 104, 0.4) inset",
      }}
    >
      <Link
        href={tabData.redirectTo || tabData.path}
        style={{
          textDecoration: "none",
          alignItems: "center",
        }}
        target={tabData.redirect ? "_blank" : "_self"}
        onClick={(e) => {
          if (tabData.auth && !isLoggedIn) {
            e.preventDefault();
          }
        }}
      >
        <Box
          sx={(theme) => ({
            background: active ? theme.palette.background.content : "initial",
            "&:hover": {
              background: theme.palette.background.content,
              // : theme.palette.background.hover,
            },
            transition: "all  0.1s linear",
            ...(((tabData.auth && !isLoggedIn) || tabData.disabled) && {
              cursor: "not-allowed",
              opacity: 0.6,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }),
            ...sideBarItem(theme),
          })}
        >
          <Typography
            variant="body2"
            fontWeight={active ? 700 : 500}
            ml={1}
            color={
              active ? (id && tabData.showId ? "text.primary" : "text.active") : "text.primary"
            }
            display="flex"
            alignItems={"center"}
          >
            {tabData.icon && (
              <tabData.icon
                sx={{
                  mr: 1,
                  color: active ? "text.active" : "text.primary",
                  "& path": {
                    fill: `${active ? "#3fc668" : ""}`,
                  },
                }}
              />
            )}
            {tabData.title}
          </Typography>
          {/* {active && id && tabData.showId && (
            <Typography
              variant="body2"
              color="text.active2"
              ml={5}
              mt={0.8}
              textTransform={"capitalize"}
            >
              {id}
            </Typography>
          )} */}
        </Box>
      </Link>
      {active && (
        <>
          {tabData.subTab?.map((subItem, subIndex) => {
            const subPath = router.asPath?.split("/")[3] || "";
            const href = `${tabData.path}/${subItem.path}`;
            const isCurrentActive =
              "/" + subPath === subItem.path || router.asPath?.match(subItem.regEx || "");
            return (
              <Link
                key={subIndex}
                href={href}
                style={{
                  textDecoration: "none",
                  alignItems: "center",
                }}
                target={tabData.redirect ? "_blank" : "_self"}
              >
                <Box
                  sx={(theme) => ({
                    py: 2,
                    pl: 7,
                    "&:hover": {
                      background: theme.palette.background.hover,
                    },
                  })}
                >
                  <Typography
                    variant="body2"
                    color={isCurrentActive ? "text.active" : "text.primary"}
                    fontWeight={isCurrentActive ? 600 : 400}
                    display="flex"
                    alignItems={"center"}
                  >
                    {subItem.icon && <subItem.icon sx={{ mr: 1 }} />}
                    {subItem.title}
                  </Typography>
                </Box>
              </Link>
            );
          })}
        </>
      )}
    </Box>
  );
};

const NormalTab = ({
  tabData,
  active,
  isLoggedIn,
}: {
  tabData: SidebarConfigItem;
  isLoggedIn?: boolean;
  active?: boolean;
}) => {
  return (
    <Link
      href={tabData.redirectTo || tabData.path}
      style={{
        textDecoration: "none",
        alignItems: "center",
      }}
      target={tabData.redirect ? "_blank" : "_self"}
    >
      {(!tabData.auth || isLoggedIn) && (
        <Box
          sx={(theme) => ({
            "& :hover": {
              backgroundColor: theme.palette.background.hover,
            },
            width: "100%",
            ...(((tabData.auth && !isLoggedIn) || tabData.disabled) && {
              cursor: "not-allowed",
              opacity: 0.6,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }),
            ...sideBarItem(theme),
          })}
        >
          <Box sx={sideBarItem}>
            <Typography
              variant="body2"
              fontWeight={500}
              ml={1}
              color={active ? "text.active" : "text.primary"}
              display="flex"
              alignItems={"center"}
            >
              <tabData.icon sx={{ mr: 1 }} /> {tabData.title}
            </Typography>
          </Box>
        </Box>
      )}
    </Link>
  );
};
