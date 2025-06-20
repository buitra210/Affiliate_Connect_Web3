/* eslint-disable @next/next/no-img-element */
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { CloseIcon } from "@centic-scoring/icons";
import { Box, Dialog, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Image } from "@centic-scoring/components/primitives";

type Props = {
  media?: {
    // eslint-disable-next-line no-unused-vars
    [type in "photo" | "video"]?: string[];
  };
};
export default function TweetsMedia({ media }: Props) {
  const { open, handleOpen, handleClose } = useDialogState();
  const [arrImg, setArrImg] = useState<string[]>([]);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const handleNext = () => {
    setActiveImgIndex((prev) => (prev + 1) % arrImg.length);
  };

  const handlePrevious = () => {
    setActiveImgIndex((prev) => (prev - 1 + arrImg.length) % arrImg.length);
  };

  useEffect(() => {
    if (media?.photo) {
      setArrImg(media.photo);
    }
    if (media?.video) {
      setArrImg(media.video);
    }
  }, [media]);

  return (
    <>
      {media && media.photo && (
        <Grid container spacing={1}>
          {media.photo?.length == 1 && (
            <Grid item xs={12}>
              <img
                src={media.photo?.[0]}
                alt={media.photo?.[0]}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                  aspectRatio: 2,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
              />
            </Grid>
          )}
          {media.photo?.length == 2 && (
            <>
              <Grid item xs={6}>
                <img
                  src={media.photo?.[0]}
                  alt={media.photo?.[0]}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    aspectRatio: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={media.photo?.[1]}
                  alt={media.photo?.[1]}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    aspectRatio: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                />
              </Grid>
            </>
          )}
          {media.photo?.length == 3 && (
            <>
              <Grid item xs={8}>
                <img
                  src={media.photo?.[0]}
                  alt={media.photo?.[0]}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    aspectRatio: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={0.5} flexDirection={"column"}>
                  <Grid item xs={12}>
                    <img
                      src={media.photo?.[1]}
                      alt={media.photo?.[1]}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "50%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        aspectRatio: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <img
                      src={media.photo?.[2]}
                      alt={media.photo?.[2]}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "50%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        aspectRatio: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          {media.photo?.length > 3 && (
            <>
              <Grid item xs={8}>
                <img
                  src={media.photo?.[0]}
                  alt={media.photo?.[0]}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    aspectRatio: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={0.5} flexDirection={"column"}>
                  <Grid item xs={12}>
                    <img
                      src={media.photo?.[1]}
                      alt={media.photo?.[1]}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "50%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        aspectRatio: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      backdropFilter: "blur(10px)",
                      position: "relative",
                    }}
                  >
                    <img
                      src={media.photo?.[2]}
                      alt={media.photo?.[2]}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "50%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        aspectRatio: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        borderRadius: "8px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                    >
                      <Typography variant="h4" fontWeight={600}>
                        +{media.photo?.length - 3}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      )}
      {media && media.video && (
        <Grid container spacing={1}>
          {media.video?.length == 1 && (
            <Grid item xs={12}>
              <video
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                  aspectRatio: 2,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
              >
                <source src={media.video[0]} />
              </video>
            </Grid>
          )}
          {media.video?.length == 2 && (
            <>
              <Grid item xs={6}>
                <video
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    aspectRatio: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                >
                  <source src={media.video[0]} />
                </video>
              </Grid>
              <Grid item xs={6}>
                <video
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    aspectRatio: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                >
                  <source src={media.video[1]} />
                </video>
              </Grid>
            </>
          )}
          {media.video?.length == 3 && (
            <>
              <Grid item xs={8}>
                <video
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    aspectRatio: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                >
                  <source src={media.video?.[0]} />
                </video>
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={0.5} flexDirection={"column"}>
                  <Grid item xs={12}>
                    <video
                      controls
                      style={{
                        width: "100%",
                        height: "50%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        aspectRatio: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                    >
                      <source src={media.video?.[1]} />
                    </video>
                  </Grid>
                  <Grid item xs={12}>
                    <video
                      controls
                      style={{
                        width: "100%",
                        height: "50%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        aspectRatio: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                    >
                      <source src={media.video?.[2]} />
                    </video>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          {media.video?.length > 3 && (
            <>
              <Grid item xs={8}>
                <video
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    aspectRatio: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                >
                  <source src={media.video?.[0]} />
                </video>
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={0.5} flexDirection={"column"}>
                  <Grid item xs={12}>
                    <video
                      controls
                      style={{
                        width: "100%",
                        height: "50%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        aspectRatio: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                    >
                      <source src={media.video?.[1]} />
                    </video>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      backdropFilter: "blur(10px)",
                      position: "relative",
                    }}
                  >
                    <video
                      controls
                      style={{
                        width: "100%",
                        height: "50%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        aspectRatio: 2,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                    >
                      <source src={media.video?.[2]} />
                    </video>
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        borderRadius: "8px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                    >
                      <Typography variant="h4" fontWeight={600}>
                        +{media.video?.length - 3}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      )}
      <Box onClick={(e) => e.stopPropagation()}>
        <Dialog
          open={open}
          onClose={() => {
            handleClose();
          }}
          disableEnforceFocus
          disableScrollLock
          PaperProps={{
            sx: {
              overflow: "hidden",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            },
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10, zIndex: 10000 }}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <CloseIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
          {media && media.photo && (
            <Image
              src={arrImg[activeImgIndex]}
              alt={`Image ${activeImgIndex + 1}`}
              key={activeImgIndex}
            />
          )}
          {media && media.video && (
            <video
              controls
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                aspectRatio: 2,
              }}
              key={activeImgIndex}
            >
              <source src={arrImg[activeImgIndex]} />
            </video>
          )}
          {arrImg.length > 1 && (
            <>
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 10,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>

              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 10,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
        </Dialog>
      </Box>
    </>
  );
}
