import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch, useCommonDataSelector } from "@centic-scoring/redux/hook";
import { getProjectDapps } from "@centic-scoring/redux/slices/common/fetchFunction";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useMemo } from "react";

type Props = {
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (chain: string) => void;
  value: string;
  chainId?: string;
};

export default function DappFilter({ value, label, onChange, chainId }: Props) {
  const { dapps } = useCommonDataSelector();
  const dispatch = useAppDispatch();
  const { id } = useURLQuery();

  const filteredChainsList = useMemo(() => {
    return (
      dapps.data
        ?.filter((d) => {
          if (!chainId) {
            return true;
          } else {
            return d.chains?.includes(chainId);
          }
        })
        ?.map((i) => {
          return {
            label: i.name,
            value: i.id,
          };
        }) || []
    );
  }, [chainId, dapps.data]);

  useEffect(() => {
    if (!filteredChainsList.find((i) => i.value === value)) {
      onChange && onChange("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredChainsList]);

  useEffect(() => {
    if (id) {
      dispatch(getProjectDapps(id));
    }
  }, [id, dispatch]);

  return (
    <Box sx={{ minWidth: "200px" }}>
      <Autocomplete
        loading={dapps.status === "PROCESSING"}
        options={[{ label: "All Dapp", value: "" }, ...filteredChainsList]}
        value={
          filteredChainsList?.find((i) => i.value === value) || {
            label: "All Dapp",
            value: "",
          }
        }
        onChange={(_, newValue) => {
          onChange && onChange(newValue?.value || "");
        }}
        renderInput={(params) => {
          return (
            <TextField
              variant="outlined"
              color="primary"
              sx={{ fontWeight: 500 }}
              {...params}
              label={label || ""}
              fullWidth
            />
          );
        }}
      />
    </Box>
  );
}
