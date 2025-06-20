import { generateComponentID, getComponentID } from "@centic-scoring/utils/string/stringUtils";
import { Box, IconButton, MenuItem, Paper, Popover, SxProps, Typography } from "@mui/material";
import { MouseEvent, PropsWithChildren, useRef, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
// import { postFiles } from "@centic-scoring/api/services/web3-growth/campaign";
import {
  generateImageFromComponentID,
  dataUrlToFileList,
  resizeImage,
} from "@centic-scoring/utils/image/imageUtil";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { TelegramIcon, TwitterIcon } from "@centic-scoring/icons";
import { postFiles } from "@centic-scoring/api/services/web3-growth/campaign";
import { toast } from "react-toastify";
import CenticLoading from "../CenticLoading";
import GraphComment, { TCommentSupportedGraph } from "../GraphComment";
import { fetchGraphComment } from "@centic-scoring/api/services/ai-content";
import {
  useCommonDataSelector,
  useHolderExploreSelector,
  useUserExploreSelector,
} from "@centic-scoring/redux/hook";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { ShareGraphTeleChecker, ShareGraphTwitterChecker } from "../questCheckers";

type Props = {
  name: string;
  buttonProps?: SxProps;
  sx?: SxProps;
  commentGraphName?: TCommentSupportedGraph;
  shareGraphName?: TCommentSupportedGraph;
  taskGraphID?: string;
  additionalProps?: {
    [key: string]: any;
  };
} & PropsWithChildren;

export const checkData = (noData: boolean, id: string) => {
  const element = document.getElementById(id);
  if (element) {
    if (noData) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  }
};

const handleUploadImage = async (name: string) => {
  try {
    const imageBase64 = await generateImageFromComponentID(getComponentID(name));
    if (imageBase64) {
      const imgBase64Resized = await resizeImage(imageBase64, 2, "#0d1921", 24);
      const files = dataUrlToFileList([imgBase64Resized], [`${name}.png`]);
      const fileUrl = await postFiles(files);
      return fileUrl?.urls![0];
    }
  } catch (error) {
    toast((error as Error).message);
  }
};

export default function ShareContainer({
  children,
  name,
  buttonProps,
  sx,
  commentGraphName,
  shareGraphName,
  additionalProps,
  taskGraphID,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleClose, handleOpen: handleOpenPopover, open } = useDialogState();

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    handleOpenPopover();
  };
  const boxRef = useRef<HTMLDivElement>();
  return (
    <Box
      ref={boxRef}
      sx={{ position: "relative", borderRadius: 3, ...(sx || {}) }}
      id={generateComponentID(name)}
    >
      <Box id={"share" + "/" + shareGraphName}>
        <IconButton
          disableRipple
          id="share-container-button"
          onClick={handleOpen}
          sx={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 10,
            ...(buttonProps || {}),
          }}
        >
          <ShareIcon color="info" />
        </IconButton>
        {commentGraphName && (
          <Box
            sx={{
              position: "absolute",
              top: "12px",
              right: "48px",
              zIndex: 10,
            }}
          >
            <GraphComment
              graph={commentGraphName}
              boxProps={{ maxWidth: (boxRef.current?.offsetWidth || 400) - 80 }}
              additionalProps={additionalProps}
              taskGraphID={taskGraphID}
            />
          </Box>
        )}
        <Popover
          anchorEl={anchorEl}
          open={open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                backgroundColor: "transparent",
                borderRadius: "16px",
              },
            },
          }}
        >
          <Paper sx={{ borderRadius: "2px" }}>
            <ShareOnTwitter
              name={name}
              graphCommentName={shareGraphName}
              additionalProps={additionalProps}
              taskGraphID={taskGraphID}
            />
            <ShareOnTele
              name={name}
              graphCommentName={shareGraphName}
              additionalProps={additionalProps}
              taskGraphID={taskGraphID}
            />
          </Paper>
        </Popover>
      </Box>
      {children}
    </Box>
  );
}

const ShareOnTwitter = ({
  name,
  graphCommentName,
  additionalProps,
  taskGraphID,
}: {
  name: string;
  graphCommentName?: TCommentSupportedGraph;
  additionalProps?: {
    [key: string]: any;
  };
  taskGraphID?: string;
}) => {
  const [loading, setLoading] = useState(false);

  const { filterOptions: filterOptionsUser } = useUserExploreSelector();
  const { filterOptions: filterOptionsHolder } = useHolderExploreSelector();
  const { start, end } = useCommonDataSelector().timeFilter;
  const { id } = useURLQuery();

  const shareOnTwitter = async () => {
    if (typeof window !== "undefined") {
      setLoading(true);
      try {
        const imageUrl = await handleUploadImage(name);
        const origin = window.location.origin;
        // "https://platform-staging.centic.io" ||
        const shareUrl = `${origin}/sharing?data=${window.btoa(
          JSON.stringify({
            thumbnail: imageUrl,
            redirectUrl: `${window.location.href}#${getComponentID(name)}`,
            title: "Check out Centic platform",
            description: "",
            url: "",
            timestamp: "",
            keywords: "",
          })
        )}`;
        let comment = "Check out Centic Platform";
        if (graphCommentName) {
          comment = (
            await fetchGraphComment({
              id,
              graphName: graphCommentName,
              retry: false,
              chainId: filterOptionsUser.chainID || filterOptionsHolder.chainID,
              contract: filterOptionsUser.smartContract,
              dapps: filterOptionsUser.dapp,
              tokenId: filterOptionsHolder.tokenID,
              startTime: Math.floor(start / 1000),
              endTime: Math.floor(end / 1000),
              timeGap: additionalProps?.timeGap,
              timeRange: additionalProps?.timeRange,
              unitTimeRange: additionalProps?.unitTimeRange,
            })
          ).content;
        }
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            comment + `\n #AI #blockchain #defi #data #dapp #Centic`
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
      } catch (error) {
        toast((error as Error).message);
      }
      setLoading(false);
    }
  };
  return (
    <>
      <ShareGraphTwitterChecker graphID={taskGraphID} />
      <MenuItem
        id={`twitter-${taskGraphID}`}
        onClick={(e) => {
          e.preventDefault();
          shareOnTwitter();
        }}
      >
        {!loading && <TwitterIcon />}
        {loading && <CenticLoading size={20} />}
        <Typography ml={0.5} fontWeight={500} variant="small">
          Share on x
        </Typography>
      </MenuItem>
    </>
  );
};

const ShareOnTele = ({
  name,
  graphCommentName,
  additionalProps,
  taskGraphID,
}: {
  name: string;
  graphCommentName?: TCommentSupportedGraph;
  additionalProps?: {
    [key: string]: any;
  };
  taskGraphID?: string;
}) => {
  const [loading, setLoading] = useState(false);

  const { filterOptions: filterOptionsUser } = useUserExploreSelector();
  const { filterOptions: filterOptionsHolder } = useHolderExploreSelector();
  const { start, end } = useCommonDataSelector().timeFilter;
  const { id } = useURLQuery();

  const shareOnTelegram = async () => {
    if (typeof window !== "undefined") {
      setLoading(true);
      try {
        const imageUrl = await handleUploadImage(name);
        const origin = window.location.origin;
        // "https://platform-staging.centic.io" ||
        const shareUrl = `${origin}/sharing?data=${window.btoa(
          JSON.stringify({
            thumbnail: imageUrl,
            redirectUrl: `${window.location.href}#${getComponentID(name)}`,
            title: "Check out Centic platform",
            description: "",
            url: "",
            timestamp: "",
            keywords: "",
          })
        )}`;
        let comment = "Check out Centic Platform";
        if (graphCommentName) {
          comment = (
            await fetchGraphComment({
              id,
              graphName: graphCommentName,
              retry: false,
              chainId: filterOptionsUser.chainID || filterOptionsHolder.chainID,
              contract: filterOptionsUser.smartContract,
              dapps: filterOptionsUser.dapp,
              tokenId: filterOptionsHolder.tokenID,
              startTime: Math.floor(start / 1000),
              endTime: Math.floor(end / 1000),
              timeGap: additionalProps?.timeGap,
              timeRange: additionalProps?.timeRange,
              unitTimeRange: additionalProps?.unitTimeRange,
            })
          ).content;
        }
        window.open(
          `https://t.me/share/url?text=${encodeURIComponent(comment)}&url=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
      } catch (error) {
        toast((error as Error).message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <ShareGraphTeleChecker graphID={taskGraphID} />
      <MenuItem
        id={`tele-${taskGraphID}`}
        onClick={(e) => {
          e.preventDefault();
          shareOnTelegram();
        }}
        sx={{ ml: -0.5 }}
      >
        {!loading && <TelegramIcon fontSize="medium" />}
        {loading && <CenticLoading size={20} />}
        <Typography ml={0.5} fontWeight={500} variant="small">
          Share on Telegram
        </Typography>
      </MenuItem>
    </>
  );
};
