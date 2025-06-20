import { useAppDispatch } from "@centic-scoring/redux/hook";
import { BackIcon } from "@centic-scoring/icons";
import {
  getAddressesSetting,
  getDAppsSetting,
  getSocialsSetting,
} from "@centic-scoring/redux/slices/setting/fetchFunctions";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Addresses from "./Addresses";
// import DApps from "./DApps";
import Summary from "./Summary";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";

export default function Setting() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = useURLQuery();
  useEffect(() => {
    if (id) {
      dispatch(getDAppsSetting({ id }));
      dispatch(getAddressesSetting({ id }));
      dispatch(getSocialsSetting({ id }));
    }
  }, [id, dispatch]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={() => {
            router.push("/projects");
          }}
        >
          <BackIcon />
        </IconButton>
        <Typography variant="h3">Setting</Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Summary />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Addresses />
      </Box>
    </Box>
  );
}
