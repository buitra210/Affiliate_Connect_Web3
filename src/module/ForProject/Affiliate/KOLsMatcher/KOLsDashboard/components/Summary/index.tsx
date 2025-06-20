import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { getKolInfo } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import { Avatar, Box, Button, Skeleton, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { compactNumber } from "@centic-scoring/utils/string/stringUtils";
import { Link } from "@centic-scoring/components/primitives/Link";
import Failed from "@centic-scoring/components/Failed";
import { StartContained, StartOutlined } from "@centic-scoring/icons";
import { addToFavorite, removeFavorite } from "@centic-scoring/api/services/affiliate";
import { toast } from "react-toastify";

// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function KOLSummary() {
  const { status, data } = useKOLsSelector().kol.info;
  const { id, kolUserName } = useURLQuery();
  const [isFavorite, setIsFavorite] = useState<boolean>(data?.favored || false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id && kolUserName) {
      dispatch(getKolInfo({ id, userName: kolUserName }));
    }
  }, [id, kolUserName, dispatch]);

  const JoinedDate = useMemo(() => {
    if (data?.timestamp) {
      const date = new Date(data?.timestamp * 1000);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
  }, [data]);

  const handleAddFavorite = async () => {
    try {
      setIsFavorite(true);
      await addToFavorite({ id: id, userName: kolUserName });
    } catch (error) {
      toast((error as Error).message);
      setIsFavorite(false);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      setIsFavorite(false);
      await removeFavorite({ id: id, userName: kolUserName });
    } catch (error) {
      toast((error as Error).message);
      setIsFavorite(true);
    }
  };

  return (
    <>
      {Object.keys(data || {}).length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Avatar
                src={data?.profileImageUrl}
                alt="kol-img"
                style={{
                  width: 60,
                  height: 60,
                  marginRight: 16,
                }}
              />
              <Box>
                <Box sx={{ mb: 2.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    {status === "SUCCESS" && (
                      <Typography variant="body1" fontWeight={600} color="text.secondary">
                        {data?.displayName}
                      </Typography>
                    )}
                    {status === "PROCESSING" && <Skeleton variant="text" width={200} />}
                    {data?.blue && (
                      <CheckCircleIcon fontSize="small" sx={{ color: "#009FDB", ml: 1 }} />
                    )}
                  </Box>
                  <Link href={data?.url || "#"}>
                    {status === "SUCCESS" && (
                      <Typography variant="body2" fontWeight={600} color="text.active" mb={1}>
                        @{data?.userName}
                      </Typography>
                    )}
                    {status === "PROCESSING" && <Skeleton variant="text" width={200} />}
                  </Link>
                  {status === "SUCCESS" && (
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color="text.secondary"
                      component="pre"
                      sx={{
                        maxWidth: "600px",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                      }}
                    >
                      {data?.rawDescription}
                    </Typography>
                  )}
                  {status === "PROCESSING" && <Skeleton variant="text" width={400} />}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {status === "PROCESSING" && <Skeleton variant="text" width={100} />}
                  {status === "SUCCESS" && (
                    <>
                      <Typography variant="h5" mr={5}>
                        {compactNumber(data?.followersCount || 0)}{" "}
                        <Typography variant="body2" color="text.secondary" component="span">
                          Followers
                        </Typography>
                      </Typography>
                      <Typography variant="h5">
                        {JoinedDate}{" "}
                        <Typography variant="body2" color="text.secondary" component="span">
                          Joined
                        </Typography>
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
            {/* <CheckBot rate={0.8} /> */}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {!isFavorite && (
              <Button
                variant="outlined"
                sx={{ width: "220px", mb: 1 }}
                startIcon={<StartOutlined />}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddFavorite();
                }}
              >
                Add to Watchlist
              </Button>
            )}
            {isFavorite && (
              <Button
                variant="outlined"
                sx={{ width: "220px", mb: 1 }}
                startIcon={<StartContained />}
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFavorite();
                }}
              >
                Remove from Watchlist
              </Button>
            )}
            {/* <Button variant="contained" sx={{ width: "193px" }}>
              Connect KOLs
            </Button> */}
          </Box>
        </Box>
      )}
      {Object.keys(data || {}).length == 0 && status == "SUCCESS" && <Nodata />}
      {status === "FAILED" && <Failed />}
    </>
  );
}

function Nodata() {
  return (
    <Box sx={{ display: "flex" }}>
      <Avatar
        alt="kol-img"
        style={{
          width: 60,
          height: 60,
          marginRight: 16,
        }}
      />
      <Box>
        <Box sx={{ mb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body1" fontWeight={600} color="text.secondary">
              Unknown
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight={600} color="text.active" mb={1}>
            unknown
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" mr={5}>
            <Typography variant="body2" color="text.secondary" component="span">
              Followers
            </Typography>
          </Typography>
          <Typography variant="h5">
            <Typography variant="body2" color="text.secondary" component="span">
              Joined
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
