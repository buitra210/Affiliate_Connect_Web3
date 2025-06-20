import useDebounce from "@centic-scoring/hooks/useDebounce";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { Box, Slider, Typography, TextField } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  value: [number, number];
  // eslint-disable-next-line no-unused-vars
  onValueChange: (newValue: [number, number]) => void;
  rangeStart: number;
  rangeEnd: number;
  disabled?: boolean;
  minDistance?: number;
  disableLabel?: boolean;
  step?: number;
  updateValue?: [number, number];
  LabelIcon?: ReactNode;
  input?: boolean;
};

export default function RangeFilter({
  onValueChange,
  rangeStart,
  value,
  rangeEnd,
  minDistance,
  disableLabel,
  step,
  updateValue,
  disabled,
  input,
  LabelIcon,
}: Props) {
  const [localValue, setLocalValue] = useState<[number, number]>([
    !disabled ? value[0] : rangeStart,
    !disabled ? value[1] : rangeEnd,
  ]);
  const distanceMin = minDistance || 10;

  const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (disabled) return;
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      const clamped = Math.min(newValue[0], rangeEnd - distanceMin);
      setLocalValue([clamped, Math.max(newValue[1], clamped + distanceMin)]);
    } else {
      const clamped = Math.max(newValue[1], distanceMin + rangeStart);
      setLocalValue([Math.min(newValue[0], clamped - distanceMin), clamped]);
    }
  };

  const handleInputChange = (index: number, newValue: string) => {
    if (newValue === "") {
      setLocalValue((prev) => {
        const updated = [...prev] as [number, number];
        updated[index] = index === 0 ? rangeStart : rangeEnd; // Giữ giá trị mặc định khi rỗng
        return updated;
      });
      return;
    }

    const parsedValue = parseInt(newValue, 10);
    if (isNaN(parsedValue)) return;

    setLocalValue((prev) => {
      const updated = [...prev] as [number, number];
      updated[index] = parsedValue;
      if (index === 0 && updated[0] > updated[1] - distanceMin) {
        updated[0] = updated[1] - distanceMin;
      } else if (index === 1 && updated[1] < updated[0] + distanceMin) {
        updated[1] = updated[0] + distanceMin;
      }
      return [
        Math.max(rangeStart, Math.min(updated[0], rangeEnd)),
        Math.max(rangeStart, Math.min(updated[1], rangeEnd)),
      ];
    });
  };

  const debounceUpdate = useDebounce(() => {
    onValueChange(localValue);
  }, 500);

  useEffect(() => {
    debounceUpdate();
  }, [localValue, debounceUpdate]);

  useEffect(() => {
    if (updateValue && !disabled) {
      setLocalValue(updateValue);
    }
  }, [updateValue, disabled]);

  return (
    <>
      <Box px={0.8}>
        <Slider
          size="small"
          color={"info"}
          value={localValue}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          min={rangeStart}
          max={rangeEnd}
          step={step}
          disabled={disabled}
          sx={{
            opacity: disabled ? 0.5 : 1,
          }}
        />
      </Box>
      {input && !disableLabel && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 1.5,
            justifyContent: "space-between",
          }}
        >
          <TextField
            size="small"
            type="number"
            value={localValue[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            disabled={disabled}
            sx={{ maxWidth: "130px" }}
          />
          <Typography variant="body2" color="text.primary">
            to
          </Typography>
          <TextField
            size="small"
            type="number"
            value={localValue[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            disabled={disabled}
            sx={{ maxWidth: "130px" }}
          />
        </Box>
      )}
      {!disableLabel && !input && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!disabled && (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {LabelIcon && LabelIcon}
              {localValue[1] < rangeEnd && (
                <Typography variant="body1" fontWeight={500} color="#97A8BC">
                  {`${formatNumber(localValue[0])} - ${formatNumber(localValue[1])}`}
                </Typography>
              )}
              {localValue[1] >= rangeEnd && (
                <Typography variant="body1" fontWeight={500} color="#97A8BC">
                  {`${formatNumber(localValue[0])} - ${formatNumber(localValue[1] - 1)}+`}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
