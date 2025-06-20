import { ReactNode } from "react";
import { StateStatus } from "../component";
import { Box } from "@mui/material";
import CenticLoading from "../CenticLoading";
import Failed from "../Failed";
import NoData from "../NoData";
import { SvgIconComponent } from "@centic-scoring/icons";

export default function ComponentWithStatus({
  children,
  status,
  noData,
  LoadingComponent,
  noDataText,
  noDataIcon,
}: {
  status: StateStatus;
  children?: ReactNode;
  noData?: boolean;
  LoadingComponent?: ReactNode;
  noDataText?: string;
  noDataIcon?: SvgIconComponent;
}) {
  return (
    <>
      {status === "PROCESSING" && (
        <Box
          className="loading-container"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {LoadingComponent ? LoadingComponent : <CenticLoading />}
        </Box>
      )}
      {status === "FAILED" && (
        <Box
          className="failed-container"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Failed />
        </Box>
      )}
      {status === "SUCCESS" && noData && (
        <Box
          className="nodata-container"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          <NoData text={noDataText || "No Data"} icon={noDataIcon} />
        </Box>
      )}
      {status === "SUCCESS" && !noData && <>{children}</>}
    </>
  );
}
