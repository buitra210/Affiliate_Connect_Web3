import { Autocomplete, Box, TextField } from "@mui/material";

type Props = {
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (chain: string) => void;
  value: string;
};

const status = [
  {
    value: "success",
    label: "Successfully",
  },
  {
    value: "failure",
    label: "Failure",
  },
  {
    value: "pending",
    label: "Pending",
  },
];

export default function StatusFilter({ value, label, onChange }: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Autocomplete
        sx={{ minWidth: "182px" }}
        options={[{ label: "All", value: "" }, ...status]}
        value={
          status
            .filter((i) => i.value == value)
            .map((i) => {
              return {
                label: i.label,
                value: i.value,
              };
            })![0] || { label: "All", value: "" }
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
            {option.label}
          </Box>
        )}
      />
    </Box>
  );
}
