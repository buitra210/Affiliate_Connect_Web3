import { TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { updateFilter } from "@centic-scoring/redux/slices/kols";

export default function SearchKOL() {
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeyword(e.target.value);
  };

  const debounceUpdate = useDebounce(() => {
    dispatch(
      updateFilter({
        keyword: keyword,
        page: 0,
      })
    );
  }, 500);

  useEffect(() => {
    debounceUpdate();
  }, [keyword, debounceUpdate]);

  return (
    <TextField
      value={keyword}
      onChange={handleChange}
      color="secondary"
      sx={{ minWidth: "350px" }}
      placeholder="Search any name or username"
      InputProps={{
        endAdornment: <SearchIcon sx={{ color: "text.active" }} />,
      }}
    />
  );
}
