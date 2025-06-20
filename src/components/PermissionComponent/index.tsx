import { usePermissionSelector } from "@centic-scoring/redux/hook";
import { UserRole } from "@centic-scoring/redux/slices/permission";
import { Box, Typography } from "@mui/material";
import { ReactNode, useCallback, useMemo } from "react";

type Props = {
  children?: ReactNode | undefined;
  requiredPermisison?: UserRole[];
  disableMode: "hidden" | "blur" | "info";
  permisionPath: string[];
  minimumPermissionRequire?: boolean;
};
export default function PermissionComponent({
  children,
  requiredPermisison,
  disableMode,
  permisionPath,
  minimumPermissionRequire,
}: Props) {
  const { data, status } = usePermissionSelector();

  const getPermisisonPath = useCallback(() => {
    let temp: any = data || {};
    for (const p of permisionPath) {
      temp = temp[p] || {};
    }
    return temp["role"] || {};
  }, [data, permisionPath]);

  const isPermission = useMemo(() => {
    if (!requiredPermisison) {
      return true;
    } else {
      let res = true;
      const permissionPath = getPermisisonPath();
      requiredPermisison.forEach((per) => {
        if (!permissionPath[per]) {
          res = false;
        }
        if (minimumPermissionRequire && permissionPath[per]) {
          res = true;
          return;
        }
      });
      return res;
    }
  }, [getPermisisonPath, requiredPermisison, minimumPermissionRequire]);
  return (
    <>
      {status === "SUCCESS" && isPermission && <>{children}</>}
      {status === "SUCCESS" && !isPermission && (
        <>
          {disableMode === "hidden" && <Box></Box>}
          {disableMode === "info" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
                width: "100%",
              }}
            >
              <Typography variant="h5" color={"text.secondary"}>
                Invalid Permission. Contact Project Owner for more information.
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
}
