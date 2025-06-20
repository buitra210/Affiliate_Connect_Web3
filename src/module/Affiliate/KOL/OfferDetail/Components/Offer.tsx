import TextEditor from "@centic-scoring/components/TextEditor";
import { chainsConfig } from "@centic-scoring/config/chain";
import { KPIDetailRow } from "@centic-scoring/module/ForProject/Affiliate/KOLsMatcher/KOLsConnect/components/NewOfferForm/steps/Step4/Requirements";
import { useKolUserSelector } from "@centic-scoring/redux/hook";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { capitalize } from "lodash";

export default function Offer() {
  const { data } = useKolUserSelector().offers.detail;
  return (
    <Paper sx={{ backgroundColor: "background.default", p: 4 }}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={data?.offerInfo?.introduction?.logo}
            sx={{ width: "38px", height: "38px", mr: 2 }}
          />
          <Typography variant="h2" fontWeight={600}>
            {data?.offerInfo?.introduction?.featureTitle}
          </Typography>
        </Box>
        <TextEditor
          onValueChange={() => {}}
          updateValue={data?.offerInfo?.introduction?.description}
          inputType="markdown"
          viewMode
        />
      </Box>
      <Box>
        <Typography variant="body1" fontWeight={600}>
          REQUIREMENTS
        </Typography>
        <Box>
          {data?.offerInfo?.requirements?.custom && (
            <TextEditor
              onValueChange={() => {}}
              updateValue={data?.offerInfo?.requirements?.custom}
              viewMode
              inputType="markdown"
              placeholder=""
            />
          )}
          <Box
            sx={{
              border: "1px solid",
              borderColor: "text.active2",
              p: 3,
              borderRadius: 2,
              mt: data?.offerInfo?.requirements?.custom ? 0 : 3,
            }}
          >
            <Typography variant="h6" color="text.secondary" mb={3}>
              KPI Detail
            </Typography>
            <Box
              sx={{
                "& .kpi-detail-row": {
                  py: 3,
                  borderBottom: "1px solid",
                  borderColor: "text.active2",
                },
                "& .kpi-detail-row:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              {data?.offerInfo?.requirements?.kpis.map((kpi, index) => {
                return (
                  <KPIDetailRow
                    key={index}
                    type={kpi.goal}
                    unit={kpi.time.type}
                    value={kpi.kpi}
                    valueUnit={kpi.time.value}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={5}>
        <Typography variant="body1" fontWeight={600} mb={3}>
          PAYMENTS
        </Typography>
        <Box>
          {data?.offerInfo?.payments.type === "Selfpay" && (
            <TextEditor
              onValueChange={() => {}}
              updateValue={data?.offerInfo.payments.custom}
              inputType="markdown"
              viewMode
            />
          )}
          <Box
            sx={{
              border: "1px solid",
              borderColor: "text.active2",
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary" mb={3}>
              Payment detail
            </Typography>
            <Box
              sx={{
                "& .kpi-detail-row": {
                  py: 3,
                  borderBottom: "1px solid",
                  borderColor: "text.active2",
                },
                "& .kpi-detail-row:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
                className="kpi-detail-row"
              >
                <Typography color={"text.label1"}>Total Token:</Typography>
                <Typography fontWeight={500} color="text.primary">
                  {`${data?.offerInfo?.payments.payInfo.amount} ${data?.offerInfo?.payments.payInfo.token.name}`}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
                className="kpi-detail-row"
              >
                <Typography color={"text.label1"}>Chain:</Typography>
                <Typography fontWeight={500} color="text.primary">
                  {chainsConfig[data?.offerInfo?.payments.payInfo.chainId || ""]?.name}
                </Typography>
              </Box>
            </Box>
            {data?.offerInfo?.payments.bonusReward && (
              <>
                <Typography variant="h6" color="text.secondary" my={3}>
                  Bonus rewards
                </Typography>
                <Box
                  sx={{
                    "& .kpi-detail-row": {
                      py: 3,
                      borderBottom: "1px solid",
                      borderColor: "text.active2",
                    },
                    "& .kpi-detail-row:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  {data?.offerInfo?.payments.bonusReward?.map((v, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                        }}
                        className="kpi-detail-row"
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <Typography color={"text.label1"}>{capitalize(v.goal)}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography fontWeight={500} color={"text.primary"}>
                              {`${formatNumber(v.kpiValue)} ${capitalize(
                                v.kpiType.replace("-", " ")
                              )}`}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <Typography color={"text.label1"}>Reward:</Typography>
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <Typography fontWeight={500} color={"text.primary"}>
                              {`${v.rewardValue}%`}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box mt={5}>
        <Typography variant="body1" fontWeight={600} mb={5}>
          CONTACT INFORMATION
        </Typography>
        <TextEditor
          onValueChange={() => {}}
          updateValue={data?.offerInfo?.contactInformation}
          inputType="markdown"
          viewMode
        />
      </Box>
    </Paper>
  );
}
