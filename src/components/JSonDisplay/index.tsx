import { Box, Typography } from "@mui/material";

type Props = {
  data: {};
};
export default function JSonDisplay({ data }: Props) {
  return (
    <Box>
      <Typography variant="body1" color={"text.primary"}>
        {"{"}
      </Typography>
      {Object.entries(data).map(([key, value], index) => {
        return (
          <Box key={index}>
            {typeof value !== "object" && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  ml: 1,
                }}
              >
                <Typography
                  variant="body1"
                  color={"text.jsonKey"}
                >{`"${key}": `}</Typography>
                <Typography color={"text.primary"}>{String(value)}</Typography>
              </Box>
            )}
            {typeof value === "object" && (
              <Typography
                variant="body1"
                color={"text.primary"}
              >{`${key}: ${String(value)}`}</Typography>
            )}
          </Box>
        );
      })}
      <Typography variant="body1" color={"text.primary"}>
        {"}"}
      </Typography>
    </Box>
  );
}
