// import useUserLevel from "@centic-scoring/hooks/useUserLevel";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function UserBadgeNotify({
  onEnd,
  videoSrc,
}: {
  onEnd?: () => void;
  videoSrc?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [show, setShow] = useState(false);
  // const { data, isFetched, isPending } = useUserLevel();
  // console.log("🚀 ~ UserBadgeNotify ~ data:", data);

  // let videoSrc = "";
  // switch (data?.userLevel) {
  //   case "beginner":
  //     videoSrc = "/videos/badgeBeginner.webm";
  //     break;
  //   case "intermediate":
  //     videoSrc = "/videos/badgeIntermediate.webm";
  //     break;
  //   case "advanced":
  //     videoSrc = "/videos/badgeAdvanced.webm";
  //     break;
  //   default:
  //     videoSrc = "/videos/badgeBeginner.webm";
  // }

  useEffect(() => {
    if (videoRef.current && isVideoReady) {
      setShow(true);
      videoRef.current?.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoReady, videoRef.current]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onended = function () {
        setShow(false);
        onEnd && onEnd();
      };
      videoRef.current?.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef.current]);

  return (
    //popup layout on top of the page
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: isVideoReady && show ? "100%" : 0,
        height: isVideoReady && show ? "100%" : 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: isVideoReady && show ? 1000 : -1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        width="auto"
        height="100%"
        controls={false}
        autoPlay={false}
        muted={true}
        onCanPlay={() => setIsVideoReady(true)}
        onLoadedData={() => setIsVideoReady(true)}
      >
        <source src={videoSrc || ""} type="video/webm" onCanPlay={() => setIsVideoReady(true)} />
      </video>
    </Box>
  );
}
