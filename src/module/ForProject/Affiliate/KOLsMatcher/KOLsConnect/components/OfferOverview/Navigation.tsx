import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import { editUpgradeType } from "@centic-scoring/redux/slices/kol-offer";
import OfferLetter from "../NewOfferForm/OfferLetter";
import useKOLsConnectparams from "../../hooks/useKOLsConnectParams";

export type View = "create" | "update" | "view" | "manager";

export default function Navigation({ type }: { type: View }) {
  const { resetParam, setParams } = useKOLsConnectparams();
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        justifyContent: "flex-end",
        "& .MuiButton-root": {
          minWidth: "120px",
        },
      }}
    >
      {type === "create" && (
        <>
          <Button variant="outlined" onClick={resetParam}>
            Go to homepage
          </Button>
          <OfferLetter />
        </>
      )}
      {type === "update" && (
        <Button
          variant="contained"
          onClick={() => {
            setParams("mode", "editable");
            dispatch(editUpgradeType("By self"));
          }}
        >
          Upgrade Offer
        </Button>
      )}
      {type === "manager" && (
        <>
          <Button
            variant="outlined"
            onClick={() => {
              setParams("mode", "editable");
              dispatch(editUpgradeType("By self"));
            }}
          >
            Edit Offer
          </Button>
          <OfferLetter />
        </>
      )}
    </Box>
  );
}
