import { SxProps } from "@mui/material";
import { StateStatus } from "../component";
import { Box } from "@mui/system";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import NoData from "../NoData";
import CenticLoading from "../CenticLoading";
import Failed from "../Failed";

export default function ChartContainer({
  status,
  sx,
  noData,
  children,
  fullHeight,
  hiddenOnNoData,
}: {
  status: StateStatus;
  sx?: SxProps;
  noData?: boolean;
  children?: ReactNode;
  fullHeight?: boolean;
  hiddenOnNoData?: boolean;
}) {
  if (status === "SUCCESS" && noData && hiddenOnNoData) {
    return null;
  }
  return (
    <Box
      sx={{
        minHeight: "240px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(fullHeight && { height: "100%" }),
        ...sx,
      }}
    >
      {status === "IDLE" && (
        <DelayRender>
          <NoData text="No Data" />
        </DelayRender>
      )}
      {status === "SUCCESS" && !noData && children}
      {status === "SUCCESS" && noData && !hiddenOnNoData && <NoData text="No Data" />}
      {status === "PROCESSING" && <CenticLoading />}
      {status === "FAILED" && <Failed />}
    </Box>
  );
}

const DelayRender = ({ children, delay }: PropsWithChildren & { delay?: number }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsShow(true);
    }, delay || 500);
    return () => clearTimeout(timeOutId);
  }, [delay]);
  return <>{isShow && children}</>;
};
