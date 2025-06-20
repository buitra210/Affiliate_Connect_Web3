import { Box, Typography, Paper } from "@mui/material";

import { useRouter } from "next/router";
import Link from "next/link";
import Contact from "@centic-scoring/components/Contact";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { SidebarConfigItem } from "@centic-scoring/layouts/sidebar-configs/sidebarConfig";
import { useAuthContext } from "@centic-scoring/context/auth-context";

//style

export default function MobileSidebar({
  configs,
  basePath,
  navigation,
  onClose,
}: {
  configs: SidebarConfigItem[];
  loading?: boolean;
  basePath?: string;
  navigation?: SidebarConfigItem[];
  onClose?: () => void;
}) {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pt: 3,
        height: "100%",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {configs?.map((item, index: number) => {
          const base = basePath ? `/${basePath}` : "/";
          const itemPath = `${item.path}`;
          const isActive =
            (itemPath === base && itemPath === router.asPath) ||
            (itemPath !== base && router.asPath.includes(itemPath));
          if (item.subTab) {
            return (
              <Box
                key={index}
                onClick={() => {
                  onClose && onClose();
                }}
              >
                <TabWithSubMenu item={item} key={index} isLoggedIn={isLoggedIn} active={isActive} />
              </Box>
            );
          }
          return (
            <Box
              key={index}
              onClick={() => {
                onClose && onClose();
              }}
            >
              <NormalTab item={item} key={index} isLoggedIn={isLoggedIn} active={isActive} />
            </Box>
          );
        })}
      </Box>
      <Box>
        {navigation?.map((item, index: number) => {
          return (
            <Box
              key={index}
              sx={{
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderImage: "linear-gradient(to right, #3fc668, #FFFFFF)",
                borderImageSlice: 1,
              }}
            >
              <NormalTab item={item} key={index} isLoggedIn={isLoggedIn} />
            </Box>
          );
        })}
        <Box
          sx={{
            pb: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Contact />
        </Box>
      </Box>
    </Paper>
  );
}

export function NormalTab({
  item,
  active,
  isLoggedIn,
}: {
  item: SidebarConfigItem;
  isLoggedIn?: boolean;
  active?: boolean;
}) {
  return (
    <Link
      href={item.redirectTo || item.path}
      style={{
        textDecoration: "none",
      }}
      target={item.redirect ? "_blank" : "_self"}
    >
      <Box
        sx={{
          textTransform: "none",
          textAlign: "center",
          py: 1,
          display: !item.auth || isLoggedIn ? "flex" : "none",
          width: "250px",
          height: "44px",
          minWidth: "130px",
          alignItems: "center",
          px: 3,
        }}
      >
        <Typography
          variant="body1"
          py={1}
          // fontWeight={500}
          color={active ? "text.active" : "text.primary"}
          display="flex"
          alignItems="center"
        >
          {item.icon && <item.icon sx={{ mr: 2 }} />}
          {item.title}
        </Typography>
      </Box>
    </Link>
  );
}

function TabWithSubMenu({
  item,
  active,
  isLoggedIn,
}: {
  item: SidebarConfigItem;
  isLoggedIn?: boolean;
  active?: boolean;
}) {
  const router = useRouter();
  const { id } = useURLQuery();
  return (
    <>
      <Link
        href={item.redirectTo || item.path || ""}
        style={{
          textDecoration: "none",
        }}
        target={item.redirect ? "_blank" : "_self"}
      >
        <Box
          sx={{
            textTransform: "none",
            textAlign: "center",
            py: 1,
            display: !item.auth || isLoggedIn ? "flex" : "none",
            flexDirection: "column",
            width: "250px",
            minWidth: "130px",
            alignItems: "flex-start",
            justifyContent: "center",
            px: 3,
            height: active ? (id ? "75px" : "initial") : "initial",
            background: active
              ? id
                ? "linear-gradient(141.53deg, #F7FFF8 0%, #8EFFC7 35%, #FDEFFF 65%, #F9F6FF 100%)"
                : "initial"
              : "inherit",
          }}
        >
          <Typography
            variant="body1"
            py={1}
            fontWeight={500}
            color={active ? (id ? "text.primary" : "text.active") : "text.primary"}
            display="flex"
            alignItems="center"
          >
            {item.icon && <item.icon sx={{ mr: 2 }} />}
            {item.title}
          </Typography>
          {active && id && item.showId && (
            <Typography variant="body2" color="text.active2" ml={5}>
              {id}
            </Typography>
          )}
        </Box>
      </Link>
      <Box>
        {Boolean(id) &&
          active &&
          item.subTab?.map((subItem, subIndex) => {
            const subPath = router.asPath?.split("/")[3] || "";
            const href = id?.trim() ? `${item.path}/${subItem.path}` : `#`;
            const isCurrentActive =
              "/" + subPath === subItem.path || router.asPath?.match(subItem.regEx || "");
            return (
              <Box
                key={subIndex}
                sx={(theme) => ({
                  py: 2,
                  pl: 7,
                  "&:hover": {
                    background: theme.palette.background.hover,
                  },
                })}
              >
                <Link
                  key={subIndex}
                  href={href}
                  style={{
                    textDecoration: "none",
                    alignItems: "center",
                  }}
                  target={item.redirect ? "_blank" : "_self"}
                >
                  <Typography
                    variant="body2"
                    color={isCurrentActive ? "text.active" : "text.primary"}
                    display="flex"
                    alignItems={"center"}
                  >
                    {subItem.icon && <subItem.icon sx={{ mr: 1 }} />}
                    {subItem.title}
                  </Typography>
                </Link>
              </Box>
            );
          })}
      </Box>
    </>
  );
}
