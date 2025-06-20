import { RTOfferNotification } from "@centic-scoring/api/services/affiliate/affiliate";
import { StateStatus } from "@centic-scoring/components/component";
import { AlertIcon } from "@centic-scoring/icons";
import { Badge, Box, IconButton, MenuItem, Popover, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { FormatTimeNotification } from "../AffiliateNotification";
import FilterItem from "../shared/FilterItem";

export type NotiData = {
  id: string;
  type: string;
  content: string;
  createTime: number;
  offerId: string;
  requestId?: string;
  read: boolean;
};
/* eslint-disable no-unused-vars */
function NotiItem({ data }: { data: NotiData }) {
  return (
    <MenuItem
      className="item"
      sx={{
        height: "70px",
        "&:hover": {
          backgroundColor: "#F0FDF4",
          borderLeft: "4px solid #3fc668",
        },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: data.read ? "unset" : "#F0FDF4",
        borderLeft: "4px solid transparent",
        gap: 1,
      }}
    >
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{ wordBreak: "break-word", whiteSpace: "wrap" }}
        color={data.read ? "text.label1" : "text.primary"}
      >
        {data.content}
      </Typography>
      <FormatTimeNotification time={data.createTime} />
    </MenuItem>
  );
}

export default function Notifications({
  data,
  status,
  handleReadAll,
  handleRead,
}: {
  data: RTOfferNotification;
  status: StateStatus;
  handleReadAll: () => void;
  handleRead?: (id?: string, notificationId?: string, status?: string, read?: boolean) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [view, setView] = useState("all");
  const [seeMore, setSeeMore] = useState(true);

  const tabList = [
    { text: "All", value: "all" },
    { text: "Unread", value: "unread" },
  ];

  const numberOfAlertsUnread = useMemo(() => {
    if (data && data.data) {
      return Object.values(data.data).filter((n) => !n.read).length;
    }
    return 0;
  }, [data]);

  const dataView = useMemo(() => {
    if (seeMore) {
      return data?.data?.slice(0, 6) || 0;
    } else {
      return data?.data;
    }
  }, [data, seeMore]);

  const [countUnread, setCountUnread] = useState<number>(0);
  useEffect(() => {
    // if (numberOfAlertsUnread >= 0) {
    setCountUnread(numberOfAlertsUnread);
    // }
  }, [numberOfAlertsUnread]);
  // const unreadCount = data?.data?.filter((item) => !item.read).length;
  const unreadCount = useMemo(() => {
    if (data && data.data) {
      return Object.values(data.data).filter((n) => !n.read).length;
    }
    return 0;
  }, [data]);

  const id = open ? "alerts-popover" : undefined;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <IconButton onClick={handleClick}>
          <Badge color="warning" badgeContent={countUnread}>
            <AlertIcon
              sx={{
                color: "primary.main",
                transition: "all 1.6s ease",
                animation: `${countUnread > 0 ? "light" : "unlight"} 2s infinite`,
                "&:hover": {
                  animation: "none",
                },
                "@keyframes light": {
                  "0%": {
                    transform: "rotate(4deg)",
                  },
                  "10%": {
                    transform: "rotate(-4deg)",
                  },
                  "20%": {
                    transform: "rotate(4deg)",
                  },
                  "30%": {
                    transform: "rotate(-4deg)",
                  },
                  "35%": {
                    transform: "rotate(0deg)",
                    filter: "none",
                  },
                  "70%": {
                    filter: "brightness(1.3) drop-shadow(0 0 5px #937c1cf5)",
                  },
                  "100%": {
                    transform: "rotate(0deg)",
                    filter: "none",
                  },
                },
                "@keyframes unlight": {
                  "0%": {
                    transform: "rotate(4deg)",
                  },
                  "10%": {
                    transform: "rotate(-4deg)",
                  },
                  "20%": {
                    transform: "rotate(4deg)",
                  },
                  "30%": {
                    transform: "rotate(-4deg)",
                  },
                  "35%": {
                    transform: "rotate(0deg)",
                    filter: "none",
                  },
                  "70%": {
                    filter: "none",
                  },
                  "100%": {
                    transform: "rotate(0deg)",
                    filter: "none",
                  },
                },
              }}
            />
          </Badge>
        </IconButton>
      </Box>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorEl={anchorEl}
        id={id}
        onClose={handleClose}
        open={open}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 2,
              minWidth: { xs: 200, sm: 400 },
              maxWidth: { xs: 300, sm: 400 },
              py: 4,
              maxHeight: "calc(100vh - 100px)",
              boxShadow: "-4px 4px 8px 0px rgba(63, 198, 104, 0.50)",
            },
            className: "hide-scrollbar",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", px: 3 }}>
          <Typography variant="h6" fontWeight={700} color="text.secondary">
            Notifications
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 3.5,
            px: 3,
          }}
        >
          <Box sx={{ display: "flex" }}>
            {tabList.map((item) => (
              <FilterItem
                key={item.value}
                text={item.text}
                active={view === item.value}
                onClick={() => setView(item.value)}
              />
            ))}
          </Box>
          <Box
            onClick={() => {
              setCountUnread(0);
              handleReadAll();
              setAnchorEl(null);
            }}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="body2" fontWeight={600} color="text.active">
              Mask all as read
            </Typography>
          </Box>
        </Box>
        {status === "SUCCESS" && data?.data?.length <= 0 && <NoNotifications />}
        {status === "PROCESSING" && <NotificationsItemSkeleton />}
        {status === "SUCCESS" && data?.data?.length > 0 && (
          <Box>
            {view === "all" &&
              dataView?.map((item) => {
                return (
                  <Box
                    key={item.id}
                    onClick={() => {
                      if (handleRead) {
                        handleRead(item.offerId, item.id, item.type, item.read);
                        setAnchorEl(null);
                        if (!item.read) setCountUnread(countUnread - 1);
                      }
                    }}
                  >
                    {item && <NotiItem data={item} />}
                  </Box>
                );
              })}
            {view === "unread" &&
              unreadCount > 0 &&
              data?.data?.map(
                (item) =>
                  !item.read && (
                    <Box
                      key={item.id}
                      onClick={() => {
                        if (handleRead) {
                          handleRead(item.offerId, item.id, item.type, item.read);
                          setAnchorEl(null);
                          setCountUnread(countUnread - 1);
                        }
                      }}
                    >
                      {item && <NotiItem data={item} />}
                    </Box>
                  )
              )}
            {view === "unread" && unreadCount === 0 && <NoNotifications />}
            {seeMore &&
              ((view === "all" && data?.data?.length > 6) ||
                (view === "unread" && unreadCount > 6)) && (
                <Box
                  onClick={() => setSeeMore(false)}
                  sx={{ textAlign: "center", cursor: "pointer", pt: 2 }}
                >
                  <Typography variant="body2" color="text.active" fontWeight={600}>
                    See more notifications
                  </Typography>
                </Box>
              )}
          </Box>
        )}
      </Popover>
    </>
  );
}

function NoNotifications() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", minWidth: "400px" }}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        There are no notifications!
      </Typography>
    </Box>
  );
}

export function NotificationsItemSkeleton() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", px: 3, gap: 1 }}>
      <Skeleton variant="text" height={30} width={300} sx={{ borderRadius: 2 }} />
      <Skeleton variant="text" height={20} width={40} sx={{ borderRadius: 2 }} />
    </Box>
  );
}
