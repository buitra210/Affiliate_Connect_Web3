import { Autocomplete, Box, TextField } from "@mui/material";
import { platformConfig } from "@centic-scoring/module/Web3Growth/Campaigns/CampaignDetail/Actions/components/colorMaping";

type Props = {
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (chain: string) => void;
  value: string;
};

export default function PlatformFilter({ value, label, onChange }: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Autocomplete
        sx={{ minWidth: "180px" }}
        options={[
          { label: "All", value: "" },
          ...(platformConfig.slice(0, 8).map((i) => ({
            label: i.name,
            value: i.id,
          })) || []),
        ]}
        value={
          platformConfig
            .slice(0, 9)
            .filter((i) => i.id === value)
            .map((i) => {
              return {
                label: i.name,
                value: i.id,
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
