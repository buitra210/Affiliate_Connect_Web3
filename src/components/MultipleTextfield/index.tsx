import { CloseIcon } from "@centic-scoring/icons";
import { Box, Chip, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onChange?: (input: string[]) => void;
  label?: string;
  placeholder?: string;
  valueArray?: string[];
  error?: boolean;
  helperText?: string;
};
export default function MultipleTextfield({
  onChange,
  label,
  placeholder,
  valueArray,
  error,
  helperText,
}: Props) {
  const [values, setValues] = useState<{ [id: number]: string }>(
    Object.assign({}, valueArray || [])
  );
  const [text, setText] = useState<string>("");
  const handleDeleteItem = (id: number) => {
    setValues((prev) => {
      const temp = { ...prev };
      try {
        delete temp[id];
      } catch (error) {
        //pass
      }
      return temp;
    });
  };
  const handleAddItem = () => {
    const newId = Date.now();
    setValues((prev) => {
      return {
        ...prev,
        [newId]: text,
      };
    });
    setText("");
  };

  useEffect(() => {
    if (values) {
      onChange && onChange(Object.values(values));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (text) {
          handleAddItem();
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "background.primary",
          px: 1.3,
          py: 0.8,
          borderRadius: 2,
          flexWrap: "wrap",
          position: "relative",
          border: error ? "1px solid red" : "",
        }}
      >
        {label && (
          <Typography
            variant="small"
            color={"#6D8198"}
            sx={{ position: "absolute", left: "10px", top: "-10px" }}
          >
            {label}
          </Typography>
        )}
        {Object.entries(values).map(([id, value]) => {
          return (
            <Chip
              key={id}
              label={value}
              sx={{
                mr: 1,
                pl: 0.1,
                pr: 0.8,
                borderRadius: "8px",
                color: "text.secondary",
                fontSize: "12px",
                backgroundColor: "background.hover",
                my: 0.5,
              }}
              deleteIcon={<CloseIcon sx={{ width: "12px", height: "12px" }} />}
              onDelete={() => {
                handleDeleteItem(Number(id));
              }}
            />
          );
        })}
        <Input
          placeholder={
            Object.values(values)?.length > 10 ? "Maximum number of items reached" : placeholder
          }
          disabled={Object.values(values)?.length > 10}
          value={text}
          sx={{
            border: "none",
            "&.MuiInput-root::before": {
              border: "none !important",
            },
            "&.MuiInput-root::after": {
              border: "none !important",
            },
            "&.Mui-focused": {
              border: "none !important",
            },
            flexGrow: 1,
            py: 0.6,
          }}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onBlur={() => {
            if (text) {
              handleAddItem();
            }
          }}
        />
        {helperText && (
          <Typography
            variant="small"
            color={"red"}
            sx={{ position: "absolute", left: "10px", top: "55px" }}
          >
            {helperText}
          </Typography>
        )}
      </Box>
    </form>
  );
}
