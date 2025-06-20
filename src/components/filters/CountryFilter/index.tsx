/* eslint-disable @next/next/no-img-element */
import { Autocomplete, Box, TextField } from "@mui/material";
import { useAppDispatch, useEngagementFilterSelector } from "@centic-scoring/redux/hook";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { getEngagementFilter } from "@centic-scoring/redux/slices/engagement/fetchFunctions";
import countryMap from "@centic-scoring/hooks/highcharts/highchartMapWorld.json";
import { getCountryFlag } from "@centic-scoring/utils/image/imageUtil";

type Props = {
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (chain: string) => void;
  value: string;
};

export default function CountryFilter({ value, label, onChange }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, data } = useEngagementFilterSelector();
  // const imgData = useMemo(() => {
  //   return getCountryFlag(
  //     countryMap.objects.default.geometries.find(
  //       (i) => i.properties.name.toLocaleLowerCase() === (value?.toLocaleLowerCase() || "")
  //     )?.properties["hc-key"] || ""
  //   );
  // }, [value]);
  const flagmaping = useMemo(() => {
    let tempData: { [name: string]: string } = {};
    countryMap.objects.default.geometries.forEach((geo) => {
      tempData[geo.properties.name] = getCountryFlag(geo.properties["hc-key"] || "") || "";
    });
    return tempData;
  }, []);
  useEffect(() => {
    if (status === "IDLE") {
      const id = String(router.query.id || "");
      if (id) {
        dispatch(getEngagementFilter(id));
      }
    }
  }, [dispatch, router.query, status]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* {imgData && (
        <Avatar src={imgData || ""} sx={{ width: "24px", height: "24px", borderRadius: 0.2 }} />
      )} */}
      <Autocomplete
        sx={{ minWidth: "180px" }}
        loading={status === "PROCESSING"}
        options={[
          { label: "All Country", value: "", icon: "" },
          ...(data?.countries?.map((i) => ({
            label: i.label,
            value: i.id,
            icon: flagmaping[i.id],
          })) || []),
        ]}
        value={
          data?.countries
            ?.filter((i) => i.id === value)
            ?.map((i) => {
              return {
                label: i.label,
                value: i.id,
                icon: flagmaping[i.id],
              };
            })![0] || { label: "All Country", value: "", icon: "" }
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
            {/* {option.icon && <img loading="lazy" width="20" src={option.icon || ""} alt="" />} */}
            {/* {!option.icon && <Box sx={{ width: "35px" }} />} */}
            {option.label}
          </Box>
        )}
      />
    </Box>
  );
}
