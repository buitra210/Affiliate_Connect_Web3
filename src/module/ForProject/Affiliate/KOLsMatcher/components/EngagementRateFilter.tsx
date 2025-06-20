import RangeFilter from "@centic-scoring/components/RangeFilter";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { updateFilter } from "@centic-scoring/redux/slices/kols";
import { Box, Button, Dialog, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";

export default function EngagementRateFilter() {
  const { handleClose, handleOpen, open } = useDialogState();
  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <Content handleClose={handleClose} />
      </Dialog>
      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <Typography variant="body2" fontWeight={500} onClick={handleOpen}>
          Engagement
        </Typography>
        <ArrowDropDownIcon color="info" />
      </Box>
    </Box>
  );
}

const LIKES_MAX = 500000;
const COMMENTS_MAX = 5000;
const RETWEETS_MAX = 10000;
const VIEWS_MAX = 10000000;
const MIN_VALUE = 0;

function Content({ handleClose }: { handleClose: () => void }) {
  const { kolsFilter } = useKOLsSelector();
  const [valueLike, setValueLike] = useState<[number, number]>([
    kolsFilter.likes_min || MIN_VALUE,
    kolsFilter.likes_max || LIKES_MAX,
  ]);
  const [valueComment, setValueComment] = useState<[number, number]>([
    kolsFilter.comments_min || MIN_VALUE,
    kolsFilter.comments_max || COMMENTS_MAX,
  ]);
  const [valueRetweet, setValueRetweet] = useState<[number, number]>([
    kolsFilter.retweets_min || MIN_VALUE,
    kolsFilter.retweets_max || RETWEETS_MAX,
  ]);
  const [valueImpression, setValueImpression] = useState<[number, number]>([
    kolsFilter.impressions_min || MIN_VALUE,
    kolsFilter.impressions_max || VIEWS_MAX,
  ]);

  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    dispatch(
      updateFilter({
        likes_min: valueLike[0],
        likes_max: valueLike[1],
        comments_min: valueComment[0],
        comments_max: valueComment[1],
        retweets_min: valueRetweet[0],
        retweets_max: valueRetweet[1],
        impressions_min: valueImpression[0],
        impressions_max: valueImpression[1],
        page: 0,
      })
    );
    handleClose();
  };

  return (
    <Box
      sx={{
        minWidth: { md: "400px", xs: "300px" },
        minHeight: "300px",
        p: 3,
        backgroundColor: "background.paper",
        "& .info-container": {
          mt: 6,
        },
      }}
    >
      <Box>
        <Typography variant="body2" fontWeight={600} color="text.primary" mt={2} mb={1}>
          Average Likes
        </Typography>
        <RangeFilter
          value={valueLike}
          rangeStart={MIN_VALUE}
          rangeEnd={LIKES_MAX}
          onValueChange={(newValue) => {
            setValueLike(newValue);
          }}
          minDistance={1}
          input={true}
        />
      </Box>
      <Box className="info-container">
        <Typography variant="body2" fontWeight={600} color="text.primary" mt={2} mb={1}>
          Average Comments
        </Typography>
        <RangeFilter
          value={valueComment}
          rangeStart={MIN_VALUE}
          rangeEnd={COMMENTS_MAX}
          onValueChange={(newValue) => {
            setValueComment(newValue);
          }}
          minDistance={1}
          input={true}
        />
      </Box>
      <Box className="info-container">
        <Typography variant="body2" fontWeight={600} color="text.primary" mt={2} mb={1}>
          Average Retweets
        </Typography>
        <RangeFilter
          value={valueRetweet}
          rangeStart={MIN_VALUE}
          rangeEnd={RETWEETS_MAX}
          onValueChange={(newValue) => {
            setValueRetweet(newValue);
          }}
          minDistance={1}
          input={true}
        />
      </Box>
      <Box className="info-container">
        <Typography variant="body2" fontWeight={600} color="text.primary" mt={2} mb={1}>
          Average Views
        </Typography>
        <RangeFilter
          value={valueImpression}
          rangeStart={MIN_VALUE}
          rangeEnd={VIEWS_MAX}
          onValueChange={(newValue) => {
            setValueImpression(newValue);
          }}
          minDistance={1}
          input={true}
        />
      </Box>
      <Box
        mt={2}
        display="flex"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Button variant="outlined" onClick={handleClose} fullWidth sx={{ mr: 0.5 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleConfirm} fullWidth sx={{ ml: 0.5 }}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
}
