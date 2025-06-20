/* eslint-disable @next/next/no-img-element */
import { TypeFilter } from "@centic-scoring/api/services/affiliate";
import { FormatTimeNotification } from "@centic-scoring/components/AffiliateNotification";
import SeeMore from "@centic-scoring/components/SeeMore";
import TextEditor from "@centic-scoring/components/TextEditor";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { LikesIcon, ReplyCountsIcon, RetweetCountsIcon, ViewIcon } from "@centic-scoring/icons";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { getKOLsTopTweet } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import { compactNumber } from "@centic-scoring/utils/string/stringUtils";
import { Avatar, Box, Divider, Paper, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TweetsMedia from "./TweetsMedia";

const PAGE_SIZE = 5;

export default function TopTweets({ type }: { type: TypeFilter }) {
  const { daily, weekly, monthly } = useKOLsSelector().kol.topTweets;
  const { id, kolUserName } = useURLQuery();
  const dispatch = useAppDispatch();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);

  const data = useMemo(() => {
    if (type === "Daily") {
      return daily;
    }
    if (type === "Weekly") {
      return weekly;
    }
    if (type === "Monthly") {
      return monthly;
    }
    return weekly;
  }, [type, daily, weekly, monthly]);
  

  const hasMore = useMemo(() => {
    return (
      data.data.status === "SUCCESS" &&
      (data.data.data?.data?.length || 0) < (data.data.data?.numberOfDocs || 0)
    );
  }, [data]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    if (
      (!(data.data.status === "SUCCESS" && data.fetchedId === kolUserName) && id && kolUserName) ||
      page > 1
    ) {
      dispatch(
        getKOLsTopTweet({
          id: id,
          userName: kolUserName,
          typeFilter: type,
          pageSize: PAGE_SIZE,
          page: page,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.fetchedId, id, kolUserName, type, dispatch, page]);

  return (
    <Box>
      <Typography variant="body2" fontWeight={500} pb={3}>
        Top tweets
      </Typography>
      <Paper
        sx={{
          py: 2.5,
          px: 4.5,
          backgroundColor: "background.paper2",
          maxHeight: "482px",
          overflow: "auto",
        }}
        className="custom-scrollbar"
      >
        {data?.data?.data?.data?.map((item, index) => {
          const isLastItem = index === (data.data.data?.data.length || 0) - 1;
          return (
            <Box key={item.id} ref={isLastItem ? observerRef : null}>
              <PostItem
                created={item.created}
                timestamp={item.timestamp}
                url={item.url}
                views={item.views}
                likes={item.likes}
                replyCounts={item.replyCounts}
                retweetCounts={item.retweetCounts}
                text={item.text}
                media={item.media}
              />
            </Box>
          );
        })}
        {data?.data?.status === "PROCESSING" && <PostItemSkeleton />}
        {data?.data?.status === "PROCESSING" && page == 1 && (
          <Box>
            <PostItemSkeleton />
            <PostItemSkeleton />
            <PostItemSkeleton />
          </Box>
        )}
      </Paper>
    </Box>
  );
}

type Props = {
  created?: string;
  timestamp: number;
  url: string;
  views: number;
  likes: number;
  replyCounts: number;
  retweetCounts: number;
  text: string;
  media?: {
    // eslint-disable-next-line no-unused-vars
    [type in "photo" | "video"]?: string[];
  };
};

export function PostItem({
  timestamp,
  url,
  views,
  likes,
  replyCounts,
  retweetCounts,
  text,
  media,
}: Props) {
  const { data, status } = useKOLsSelector().kol.info;

  return (
    <Box mb={3} onClick={() => window.open(url, "_blank")} sx={{ cursor: "pointer" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Avatar
            src={data?.profileImageUrl}
            alt="kol-img"
            style={{
              width: 45,
              height: 45,
              marginRight: 16,
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {status === "SUCCESS" && (
              <Typography variant="body1" fontWeight={600} color="text.primary">
                {data?.displayName}
              </Typography>
            )}
            {status === "PROCESSING" && <Skeleton variant="text" width={200} />}
            {status === "SUCCESS" && (
              <Typography variant="small" fontWeight={600} color="text.label1" mb={1}>
                @{data?.userName}
              </Typography>
            )}
            {status === "PROCESSING" && <Skeleton variant="text" width={200} />}
          </Box>
        </Box>
        <FormatTimeNotification time={timestamp} />
      </Box>
      <SeeMore shrinkHeight={80}>
        <Box
          sx={{
            "& .text-container": {
              backgroundColor: "background.paper2",
              paddingBottom: "0px !important",
            },
            "& .toolbar-container": {
              display: "none",
            },
          }}
        >
          <TextEditor
            viewMode
            updateValue={text}
            initValue={text}
            onValueChange={() => {}}
            inputType="markdown"
            outputType="markdown"
          />
        </Box>
      </SeeMore>

      <TweetsMedia media={media} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LikesIcon sx={{ fontSize: "16px", mr: 0.5 }} />
          <Typography variant="small" color="text.label1" fontWeight={600}>
            {compactNumber(likes)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ReplyCountsIcon sx={{ fontSize: "16px", mr: 0.5 }} />
          <Typography variant="small" color="text.label1" fontWeight={600}>
            {compactNumber(replyCounts)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <RetweetCountsIcon sx={{ fontSize: "16px", mr: 0.5 }} />
          <Typography variant="small" color="text.label1" fontWeight={600}>
            {compactNumber(retweetCounts)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ViewIcon sx={{ fontSize: "16px", mr: 0.5 }} />
          <Typography variant="small" color="text.label1" fontWeight={600}>
            {compactNumber(views)}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ pt: 3 }} />
    </Box>
  );
}

function PostItemSkeleton() {
  return (
    <Box mb={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 10 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Skeleton variant="circular" width={45} height={45} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Skeleton variant="text" width={150} />
            <Skeleton variant="text" width={150} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton variant="text" width="70px" />
        <Skeleton variant="text" width="70px" />
        <Skeleton variant="text" width="70px" />
        <Skeleton variant="text" width="70px" />
      </Box>
    </Box>
  );
}
