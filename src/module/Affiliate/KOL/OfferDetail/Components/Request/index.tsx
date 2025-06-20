import { AddIcon, CloseIcon } from "@centic-scoring/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import RequestKPIExpectation from "./RequestKPIExpectation";
import RequestKPIPayment from "./RequestKPIPayment";
import {
  addKOLRequest,
  deleteKOLRequest,
  editOtherRequest,
  setType,
  TAffiliateKOL,
} from "@centic-scoring/redux/slices/affiliate-kol";
import {
  useAffiliateKOLsSelector,
  useAppDispatch,
  useKolUserSelector,
} from "@centic-scoring/redux/hook";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { toast } from "react-toastify";
import { DeleteOutline } from "@mui/icons-material";
import {
  AffiliateKOLAPI,
  TAffiliateKOLRequest,
} from "@centic-scoring/api/services/affiliate/affiliate";
import { useRouter } from "next/router";

export type TOptionRequest = "KPI expectation" | "Payment" | "Other";

export type RequestOption = {
  type: TOptionRequest;
  details: string;
};
export function transformToKOLRequest(
  kolRequest: TAffiliateKOL["kolRequest"]
): TAffiliateKOLRequest {
  return {
    setupRequest: {
      value: Object.values(kolRequest).map((request) => {
        switch (request.type) {
          case "KPI expectation":
            return {
              type: "KPI expectation",
              detail: Object.values(request.kpiExpect).map((kpi) => ({
                goal: kpi.require.type,
                kpi: kpi.require.value,
                time: {
                  type: kpi.timeRequire.unit,
                  value: kpi.timeRequire.value,
                },
              })),
            };
          case "Payment":
            return {
              type: "Payment",
              detail: {
                rule: request.payment.rule,
                bonusReward: Object.values(request.payment.bonusReward).map((bonus) => ({
                  goal: bonus.goal,
                  kpiType: bonus.kpiType,
                  kpiValue: bonus.kpiValue,
                  rewardValue: bonus.rewardValue,
                })),
              },
            };
          case "Other":
            return {
              type: "Other",
              detail: request.other,
            };
          default:
            return {
              type: "KPI expectation",
              detail: Object.values(request.kpiExpect).map((kpi) => ({
                goal: kpi.require.type,
                kpi: kpi.require.value,
                time: {
                  type: kpi.timeRequire.unit,
                  value: kpi.timeRequire.value,
                },
              })),
            };
        }
      }),
    },
  };
}

export default function Request({ handleClose }: { handleClose: () => void }) {
  const { kolRequest } = useAffiliateKOLsSelector();
  const dispatch = useAppDispatch();
  const { getCustomKey } = useURLQuery();
  const offerId = getCustomKey("offerId");
  const router = useRouter();
  const [usedTypes, setUsedTypes] = useState<string[]>([]);
  const { detail } = useKolUserSelector().offers;

  useEffect(() => {
    setUsedTypes(Object.values(kolRequest).map((req) => req.type));
  }, [kolRequest]);

  const handleSubmitRequest = async () => {
    try {
      const transformRequest = transformToKOLRequest(kolRequest);
      if (detail.data?.offerInfo?.status === "Request") {
        await AffiliateKOLAPI.editKOLRequest(
          offerId,
          transformRequest,
          detail.data?.requestId as string
        );
        router.push("/affiliate");
      }

      if (detail.data?.offerInfo?.status === "Pending") {
        await AffiliateKOLAPI.createKOLRequest(offerId, transformRequest);
        router.push("/affiliate");
      }
      handleClose();
      toast.success("Request submitted successfully!");
    } catch (error) {
      toast.error("Error when submit request");
      console.error(error);
    }
  };
  return (
    <Box sx={{ py: 4, px: 3, minWidth: "300px", backgroundColor: "background.paper" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h4" color="text.secondary">
          Request
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon sx={{ fontSize: "1rem", color: "#5D84A7" }} />
        </IconButton>
      </Box>
      {Object.entries(kolRequest).map(([id, value]) => (
        <Box key={id}>
          <Box>
            <Typography variant="body2" color="text.label1" sx={{ mt: 2, mb: 1 }}>
              Type
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormControl sx={{ minWidth: "250px" }}>
                <Select
                  value={value.type}
                  label="Type"
                  onChange={(e) => {
                    const newType = e.target.value as TOptionRequest;
                    dispatch(setType({ id: Number(id), type: newType }));
                    setUsedTypes((prev) => [
                      ...prev.filter((type) => type !== value.type),
                      newType,
                    ]);
                  }}
                >
                  {["KPI expectation", "Payment", "Other"]
                    .filter((type) => !usedTypes.includes(type) || type === value.type)
                    .map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <IconButton
                sx={{
                  ml: 2,
                  color: "text.active2",
                }}
                onClick={() => {
                  if (Object.keys(kolRequest).length > 1) {
                    dispatch(deleteKOLRequest({ id: Number(id) }));
                  }
                }}
                disabled={Object.keys(kolRequest).length <= 1}
              >
                <DeleteOutline />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" color="text.label1" sx={{ mt: 3, mb: 1 }}>
              Details
            </Typography>
            {value.type === "KPI expectation" && (
              <Paper sx={{ backgroundColor: "background.hover", padding: "2.5" }}>
                <RequestKPIExpectation requestId={Number(id)} />
              </Paper>
            )}
            {value.type === "Payment" && (
              <Paper
                sx={{
                  backgroundColor: "background.hover",
                  padding: 2.5,
                  minWidth: { md: "600px", sm: "300px" },
                }}
              >
                <RequestKPIPayment paymentId={Number(id)} />
              </Paper>
            )}
            {value.type === "Other" && (
              <TextField
                fullWidth
                label={"Details request"}
                multiline
                rows={4}
                value={kolRequest[Number(id)].other}
                onChange={(e) =>
                  dispatch(editOtherRequest({ id: Number(id), other: e.target.value }))
                }
                className="custom-scrollbar"
                sx={{ minWidth: { md: "600px", sm: "300px" } }}
              />
            )}
          </Box>
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          onClick={() => {
            const remainingTypes = ["KPI expectation", "Payment", "Other"].filter(
              (type) => !usedTypes.includes(type)
            );

            if (remainingTypes.length > 0) {
              dispatch(addKOLRequest());
            }
          }}
          variant="outlined"
          color="info"
          disabled={
            ["KPI expectation", "Payment", "Other"].filter((type) => !usedTypes.includes(type))
              .length === 0
          }
        >
          <AddIcon sx={{ mr: 1 }} /> Add Request
        </Button>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <Button variant="outlined" color="info" sx={{ width: "100px" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ width: "100px" }} onClick={handleSubmitRequest}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
