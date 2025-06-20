/* eslint-disable @next/next/no-img-element */
import { chainsConfig } from "@centic-scoring/config/chain";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch, useCommonDataSelector } from "@centic-scoring/redux/hook";
import { getProjectChains } from "@centic-scoring/redux/slices/common/fetchFunction";
import { Autocomplete, Avatar, Box, TextField } from "@mui/material";
import { useMemo, useEffect } from "react";

export type ChainFilterValue = { label: string; value: string; icon?: string };
type Props = {
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (chain: string) => void;
  value: string;
};

export default function TokenChainFilter({ label, onChange, value }: Props) {
  const dispatch = useAppDispatch();
  const { chains, token } = useCommonDataSelector();
  const { id } = useURLQuery();

  const tokensChains = useMemo(() => {
    return (token?.data || [])
      .reduce((currentSum, currentItem) => {
        return currentSum.concat(currentItem.chains || []);
      }, [] as string[])
      .reduce((currentSum, currentItem) => {
        if (!currentSum.includes(currentItem)) {
          return currentSum.concat([currentItem]);
        } else {
          return currentSum;
        }
      }, [] as string[]);
  }, [token.data]);

  const chainsOptions = useMemo(() => {
    const chainEntries =
      chains.data
        ?.map((chain) => [chain, chainsConfig[chain]])
        .filter((i) => tokensChains.includes(String(i[0]))) || [];
    return Object.fromEntries(chainEntries) as typeof chainsConfig;
  }, [chains, tokensChains]);

  useEffect(() => {
    if (id) {
      if (id) {
        dispatch(getProjectChains(id));
      }
    }
  }, [dispatch, id]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {chainsOptions![value]?.img && (
        <Avatar src={chainsOptions![value]?.img || ""} sx={{ width: "24px", height: "24px" }} />
      )}
      <Autocomplete
        sx={{
          minWidth: "160px",
          "& .MuiInputBase-root": {
            paddingLeft: "3px",
          },
        }}
        onChange={(_, newValue) => {
          onChange && onChange(newValue?.value || "");
        }}
        options={[
          { label: "All Chains", value: "" },
          ...(Object.values(chainsOptions!)
            ?.filter((v) => v)
            ?.map((i) => ({ value: i.id, label: i.name })) || {}),
        ]}
        value={{ label: chainsOptions![value]?.name || "All Chains", value: value }}
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
        renderOption={(props, option) => (
          <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
            {chainsOptions![option.value]?.img && (
              <img loading="lazy" width="20" src={chainsOptions![option.value]?.img} alt="" />
            )}
            {option.label}
          </Box>
        )}
      />
    </Box>
  );
}
