import useDebounce from "@centic-scoring/hooks/useDebounce";
import { DataWithStatus } from "@centic-scoring/redux/slices/global";
import {
  Autocomplete,
  AutocompleteProps,
  Avatar,
  Box,
  Chip,
  InputAdornment,
  MenuItem,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import CenticLoading from "../CenticLoading";
import NoData from "../NoData";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: ItemOption | null) => void;
  // eslint-disable-next-line no-unused-vars
  onKeyWordChangeOptions: (keyword: string) => Promise<ItemOption[]>;
  LoadingComponent?: ReactNode;
  label?: string;
  multiple?: boolean;
  inputProps?: Partial<AutocompleteProps<any | string, boolean, boolean, boolean>>;
  sx?: SxProps<Theme>;
  value?: ItemOption;
};

type ItemOption = {
  icon?: string;
  label?: string;
  value: string;
  tag?: string;
};

export default function AsyncSearch({
  onKeyWordChangeOptions,
  LoadingComponent,
  onChange,
  label,
  inputProps,
  sx,
  value,
}: Props) {
  const [options, setOptions] = useState<DataWithStatus<ItemOption[]>>({
    status: "IDLE",
    data: [],
  });
  const [keyword, setKeyword] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>(value?.icon || "");
  const updateOptions = useDebounce(async () => {
    try {
      setOptions((prev) => ({ ...prev, status: "PROCESSING" }));
      const optionsRes = await onKeyWordChangeOptions(keyword || "");
      setOptions({ status: "SUCCESS", data: optionsRes });
    } catch (error) {
      setOptions((prev) => ({ ...prev, status: "FAILED" }));
    }
  }, 1000);

  useEffect(() => {
    if (keyword) {
      updateOptions();
    }
  }, [keyword, updateOptions]);

  return (
    <Box sx={sx}>
      <Autocomplete
        options={options.data || []}
        onChange={(event: any, newValue) => {
          onChange && onChange(newValue);
          setSelectedAvatar(newValue?.icon);
        }}
        renderInput={(params) => {
          return (
            <Box>
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: params.inputProps.value && (
                    <InputAdornment position="start">
                      {selectedAvatar && (
                        <Avatar
                          src={selectedAvatar}
                          sx={{ width: "20px", height: "20px", mr: -0.5, ml: 1 }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                fullWidth
                label={label || ""}
              />
            </Box>
          );
        }}
        ListboxProps={{ className: "hide-scrollbar" }}
        renderOption={(props, option) => {
          return (
            <MenuItem {...props} key={option.value}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {option.icon && (
                  <Avatar src={option.icon} sx={{ width: "20px", height: "20px", mr: 1 }} />
                )}
                {option.label}
                {option.tag && <Chip label={option.tag} sx={{ ml: 1 }} />}
              </Box>
            </MenuItem>
          );
        }}
        onInputChange={(event, newInputValue) => {
          setKeyword(newInputValue);
        }}
        loading={options.status === "PROCESSING"}
        loadingText={LoadingComponent || <CenticLoading size={20} />}
        noOptionsText={
          <Box sx={{ my: 2 }}>
            <NoData
              text={
                keyword === ""
                  ? "Try searching for a keyword"
                  : "No Options! try searching for a space"
              }
            />
          </Box>
        }
        {...inputProps}
      />
    </Box>
  );
}
