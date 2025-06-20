import { CloseIcon } from "@centic-scoring/icons";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { searchKolLists, searchKolWatchLists } from "@centic-scoring/api/services/affiliate";
import {
  useForProjectCommonSelector,
  useKOLOfferSelector,
  useKOLsSelector,
} from "@centic-scoring/redux/hook";
import { DataWithStatus } from "@centic-scoring/redux/slices/global";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import CenticLoading from "@centic-scoring/components/CenticLoading";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { connectKOLs } from "@centic-scoring/api/services/affiliate/affiliate";

type ItemOption = {
  icon?: string;
  label?: string;
  value: string;
  tag?: string;
};

export default function SearchKol({ handleClose }: { handleClose: () => void }) {
  const [selected, setSelected] = useState<ItemOption[]>([]);
  const { project } = useForProjectCommonSelector();
  const { kolsFilter } = useKOLsSelector();
  const [loading, setLoading] = useState<boolean>(false);
  const { letterContent } = useKOLOfferSelector();
  const [favor, setFavor] = useState<DataWithStatus<ItemOption[]>>({
    status: "IDLE",
    data: [],
  });
  const [options, setOptions] = useState<DataWithStatus<ItemOption[]>>({
    status: "IDLE",
    data: [],
  });
  const [keyword, setKeyword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleDeleteSelected = (item: ItemOption) => {
    setSelected((prev) => prev.filter((i) => i.value !== item.value));
  };

  const handleAddSelected = (item: ItemOption) => {
    setSelected((prev) => {
      if (prev.some((selectedItem) => selectedItem.value === item.value)) {
        return prev;
      }
      return prev.concat([item]);
    });
    setOpen(false);
  };
  const handleOpenSearch = async () => {
    setFavor((prev) => ({ ...prev, status: "PROCESSING" }));
    try {
      const res = await searchKolWatchLists(project.data?.id || "", {
        ...kolsFilter,
        page: Number(kolsFilter?.page) + 1,
      });
      setFavor({
        status: "SUCCESS",
        data: res.data.map((i) => ({
          icon: i.avatar,
          label: i.name,
          value: i.userId,
          tag: i.userName,
        })),
      });
    } catch (error) {
      setFavor((prev) => ({ ...prev, status: "FAILED" }));
    }
  };

  const updateOptions = useDebounce(async () => {
    setOptions((prev) => ({ ...prev, status: "PROCESSING" }));
    try {
      const res = await searchKolLists(project.data?.id || "", {
        ...kolsFilter,
        keyword,
        page: Number(kolsFilter?.page) + 1,
      });
      setOptions({
        status: "SUCCESS",
        data: res.data.map((i) => ({
          icon: i.avatar,
          label: i.name,
          value: i.userId,
          tag: i.userName,
        })),
      });
    } catch (error) {
      setOptions((prev) => ({ ...prev, status: "FAILED" }));
    }
  }, 1000);

  useEffect(() => {
    if (keyword) {
      updateOptions();
    }
  }, [keyword, updateOptions]);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await connectKOLs(
        selected.map((i) => ({
          kolId: i.value,
          displayName: i.tag ?? "",
        })),
        letterContent
      );
      toast.success("Connect KOLs successfully");
      handleClose();
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <Paper sx={{ px: 5, py: 6, width: "100%", minWidth: "800px" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700} color="text.secondary">
          CONNECT KOLs from our KOL Dashboard
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon sx={{ fontSize: "1rem" }} />
        </IconButton>
      </Box>
      <Autocomplete
        onFocus={() => {
          handleOpenSearch();
          setOpen(true);
        }}
        open={open}
        selectOnFocus
        clearOnBlur
        disableClearable
        onClose={() => setOpen(false)}
        fullWidth
        multiple
        options={options.data || []}
        onInputChange={(_, newInputValue) => {
          setKeyword(newInputValue);
          setOpen(!!newInputValue);
        }}
        isOptionEqualToValue={(option, value) => {
          return option.value === value.value;
        }}
        onChange={(_, value) => {
          setSelected((prev) => [
            ...prev,
            ...value
              .filter((i) => !prev.some((j) => j.value === i.value))
              .map((i) => ({
                label: i.label,
                value: i.value,
                tag: i.tag,
                icon: i.icon,
              })),
          ]);
          setOptions({ status: "SUCCESS", data: value });
        }}
        ListboxProps={{
          className: "hide-scrollbar",
          sx: { backgroundColor: "background.primary" },
        }}
        noOptionsText={
          <Box>
            {favor.data && (
              <Box sx={{ bgcolor: "background.primary", p: 2, minHeight: "174px" }}>
                <Typography variant="body2" fontWeight={500} color="text.label1" mb={2}>
                  KOLs watchlist
                </Typography>
                {favor.data?.map((i) => (
                  <MenuItem
                    key={i.value}
                    onClick={() => handleAddSelected(i)}
                    sx={{ minHeight: "56px", mb: "14px", borderRadius: "8px" }}
                    selected={selected.some((j) => j.value === i.value)}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {i.icon && <Avatar src={i.icon} sx={{ width: 20, height: 20, mr: 1 }} />}
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="body2" fontWeight={600}>
                          {i.label}
                        </Typography>
                        <Typography variant="small" color="text.label1">
                          {`@${i.tag}`}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Box>
            )}
          </Box>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon color="info" sx={{ cursor: "pointer" }} />
                </InputAdornment>
              ),
            }}
            placeholder="Search for the KOL's name you wish to connect with"
          />
        )}
        ChipProps={{
          style: { display: "none" },
        }}
        loading={options.status === "PROCESSING"}
        loadingText={<CenticLoading size={20} />}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.value} sx={{ mt: "14px", borderRadius: "8px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {option.icon && <Avatar src={option.icon} sx={{ width: 20, height: 20, mr: 1 }} />}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" fontWeight={600}>
                  {option.label}
                </Typography>
                <Typography variant="small" color="text.label1">
                  {`@${option.tag}`}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        )}
        sx={{
          my: 3.5,
          "&.MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root, &.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root":
            {
              paddingRight: "20px",
            },
        }}
        ListboxComponent={(props) => (
          <Box {...props} sx={{ position: "relative" }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" fontWeight={500} color="text.label1">
                KOLs leaderboard
              </Typography>
              {props.children}
            </Box>
            <Divider />
            <Box sx={{ bgcolor: "background.primary", p: 2, minHeight: "174px" }}>
              <Typography variant="body2" fontWeight={500} color="text.label1" mb={2}>
                KOLs watchlist
              </Typography>
              {favor.data?.map((i) => (
                <MenuItem
                  key={i.value}
                  onClick={() => handleAddSelected(i)}
                  sx={{ minHeight: "56px", mb: "14px", borderRadius: "8px" }}
                  selected={selected.some((j) => j.value === i.value)}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {i.icon && <Avatar src={i.icon} sx={{ width: 20, height: 20, mr: 1 }} />}
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="body2" fontWeight={600}>
                        {i.label}
                      </Typography>
                      <Typography variant="small" color="text.label1">
                        {`@${i.tag}`}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Box>
          </Box>
        )}
      />
      <Box>
        <Typography variant="body1" fontWeight={600} mb={1}>
          Selected KOLs
        </Typography>
        <Paper sx={{ bgcolor: "background.primary", p: 3, minHeight: "174px" }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {selected.map((i) => (
              <Grid key={i.value} item xs={4}>
                <Paper
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    backgroundColor: "background.paper2",
                    position: "relative",
                  }}
                >
                  <Avatar src={i.icon} sx={{ width: 36, height: 36, mr: 1 }} />
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      className="text-truncate"
                      sx={{ maxWidth: "120px" }}
                    >
                      {i.label}
                    </Typography>
                    <Typography
                      variant="small"
                      color="text.label1"
                      className="text-truncate"
                      sx={{ maxWidth: "120px" }}
                    >
                      {`@${i.tag}`}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => {
                      handleDeleteSelected(i);
                    }}
                    sx={{ position: "absolute", top: "12px", right: "10px" }}
                  >
                    <CloseIcon sx={{ fontSize: "0.8rem" }} />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "flex-end",
          "& .MuiButton-root": {
            minWidth: "200px",
          },
          mt: 3.5,
        }}
      >
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton variant="contained" loading={loading} onClick={handleConnect}>
          Connect
        </LoadingButton>
      </Box>
    </Paper>
  );
}
