import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { KOLRecommendationRequest } from "@centic-scoring/api/services/recommendation-api";
import BootstrapDialogTitle from "@centic-scoring/components/primitives/Dialog";

const CATEGORIES = [
  "game",
  "defi",
  "nft",
  "dao",
  "metaverse",
  "ai",
  "infrastructure",
  "layer1",
  "layer2",
  "meme",
  "social",
];

type Props = {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (_data: KOLRecommendationRequest) => void;
  loading?: boolean;
  initialValues?: KOLRecommendationRequest | null;
};

export default function KOLRecommendationDialog({
  open,
  onClose,
  onSubmit,
  loading,
  initialValues,
}: Props) {
  const [formData, setFormData] = useState<KOLRecommendationRequest>(
    initialValues || {
      top_k: 7,
      weights: [0.6, 0.4],
      override_summary: "",
      override_categories: [],
    }
  );

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setFormData({
      ...formData,
      override_categories: value,
    });
  };

  const handleWeightChange = (index: number, value: number) => {
    const newWeights = [...formData.weights];
    newWeights[index] = value;
    setFormData({
      ...formData,
      weights: newWeights,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose(); // Đóng popup sau khi submit
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <BootstrapDialogTitle onClose={handleClose}>Find KOL</BootstrapDialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 2 }}>
          <TextField
            label="Number of KOLs"
            type="number"
            value={formData.top_k}
            onChange={(e) =>
              setFormData({
                ...formData,
                top_k: parseInt(e.target.value) || 10,
              })
            }
            inputProps={{ min: 1 }}
            fullWidth
          />

          {/* Weights */}
          <Box>
            <Typography variant="body2" fontWeight={500} mb={2}>
              Weights (total = 1.0)
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Weight 1"
                type="number"
                value={formData.weights[0]}
                onChange={(e) => handleWeightChange(0, parseFloat(e.target.value) || 0)}
                inputProps={{ min: 0, max: 1, step: 0.1 }}
                size="small"
                fullWidth
              />
              <TextField
                label="Weight 2"
                type="number"
                value={formData.weights[1]}
                onChange={(e) => handleWeightChange(1, parseFloat(e.target.value) || 0)}
                inputProps={{ min: 0, max: 1, step: 0.1 }}
                size="small"
                fullWidth
              />
            </Box>
          </Box>

          <TextField
            label="Mô tả dự án tùy chỉnh"
            multiline
            rows={3}
            value={formData.override_summary}
            onChange={(e) =>
              setFormData({
                ...formData,
                override_summary: e.target.value,
              })
            }
            placeholder="Enter a description of your project..."
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={formData.override_categories}
              onChange={handleCategoryChange}
              input={<OutlinedInput label="Categories" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={loading} size="large">
              {loading ? "Searching..." : "Find KOL"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
