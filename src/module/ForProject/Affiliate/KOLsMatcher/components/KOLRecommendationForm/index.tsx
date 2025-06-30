import {
  Box,
  Button,
  Card,
  CardContent,
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
];

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (_data: KOLRecommendationRequest) => void;
  loading?: boolean;
  initialValues?: KOLRecommendationRequest | null;
};

export default function KOLRecommendationForm({ onSubmit, loading, initialValues }: Props) {
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
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Find KOLs
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
            inputProps={{ min: 0 }}
            fullWidth
          />

          {/* Weights */}
          <Box>
            <Typography variant="body2" fontWeight={500} mb={2}>
              Weights (sum = 1.0)
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Weight 1"
                type="number"
                value={formData.weights[0]}
                onChange={(e) => handleWeightChange(0, parseFloat(e.target.value) || 0)}
                inputProps={{ min: 0, max: 1, step: 0.1 }}
                size="small"
              />
              <TextField
                label="Weight 2"
                type="number"
                value={formData.weights[1]}
                onChange={(e) => handleWeightChange(1, parseFloat(e.target.value) || 0)}
                inputProps={{ min: 0, max: 1, step: 0.1 }}
                size="small"
              />
            </Box>
          </Box>

          <TextField
            label="Custom project description"
            multiline
            rows={3}
            value={formData.override_summary}
            onChange={(e) =>
              setFormData({
                ...formData,
                override_summary: e.target.value,
              })
            }
            placeholder="Nhập mô tả về dự án của bạn..."
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={formData.override_categories}
              onChange={handleCategoryChange}
              input={<OutlinedInput label="Danh mục" />}
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

          <Button variant="contained" onClick={handleSubmit} disabled={loading} size="large">
            {loading ? "Searching..." : "Find KOLs"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
