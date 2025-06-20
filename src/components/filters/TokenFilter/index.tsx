/* eslint-disable @next/next/no-img-element */
import { Autocomplete, Avatar, Box, TextField } from "@mui/material";
import { useAppDispatch, useCommonDataSelector } from "@centic-scoring/redux/hook";
import { useEffect, useMemo } from "react";
import { getProjectTokens } from "@centic-scoring/redux/slices/common/fetchFunction";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";

type Props = {
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (chain: string) => void;
  value: string;
  chainId?: string;
};

export default function TokenFilter({ value, label, onChange, chainId }: Props) {
  const dispatch = useAppDispatch();
  const { token } = useCommonDataSelector();
  const { id } = useURLQuery();
  const filteredToken = useMemo(() => {
    return (
      token.data
        ?.filter((d) => {
          if (!chainId) {
            return true;
          } else {
            return d.chains?.includes(chainId);
          }
        })
        ?.map((i) => ({
          label: i.name,
          value: i.id,
          icon: i.imgUrl,
        })) || []
    );
  }, [token, chainId]);

  useEffect(() => {
    if (!filteredToken.find((i) => i.value === value)) {
      onChange && onChange("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredToken]);

  const imgData = useMemo(() => {
    return token.data?.find((i) => i.id === value)?.imgUrl;
  }, [token.data, value]);

  useEffect(() => {
    if (id) {
      if (id) {
        dispatch(getProjectTokens(id));
      }
    }
  }, [dispatch, id]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {imgData && <Avatar src={imgData || ""} sx={{ width: "24px", height: "24px" }} />}
      <Autocomplete
        sx={{ minWidth: "170px" }}
        loading={token.status === "PROCESSING"}
        options={[{ label: "All Tokens", value: "", icon: "" }, ...filteredToken]}
        value={
          filteredToken?.find((i) => i.value === value) || {
            label: "All Token",
            value: "",
            icon: "",
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
        renderOption={(props, option) => (
          <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
            {option.icon && <img loading="lazy" width="20" src={option.icon || ""} alt="" />}
            {option.label}
          </Box>
        )}
      />
    </Box>
  );
}
