import { Box } from "@mui/material";

type LimitTextProps = {
  limit?: number;
  remainingNumber?: number;
};

const WARNING_CAP = 20;

export default function LimitTextIndicator({ limit, remainingNumber }: LimitTextProps) {
  if (limit === undefined || remainingNumber === undefined) {
    return null;
  }
  const percentage = ((limit - remainingNumber) / limit) * 360;
  const warning = Boolean(remainingNumber <= WARNING_CAP);
  const getIndicatorColor = () => {
    if (remainingNumber <= 0) {
      return "#C22525";
    }
    if (remainingNumber <= WARNING_CAP) {
      return "#FFB140";
    }
    return "#009FDB";
  };

  return (
    <Box
      sx={{
        background: `conic-gradient(${getIndicatorColor()} ${percentage}deg, #344456 ${percentage}deg 360deg)`,
        width: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        color: "#C22525",
        fontSize: "20px",
        fontWeight: "bold",
        zIndex: 1,
        transition: "all 0.2s linear",
        transform: warning ? "scale(1.2)" : "scale(1)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.primary",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            fontSize: "10px",
            fontWeight: 600,
            color: getIndicatorColor(),
          }}
        >
          {warning && remainingNumber}
        </Box>
      </Box>
    </Box>
  );
}
