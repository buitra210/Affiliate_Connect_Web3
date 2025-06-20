import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useKOLOfferSelector } from "@centic-scoring/redux/hook";
import Navigation, { View } from "./Navigation";
import Requirements from "../NewOfferForm/steps/Step4/Requirements";
import Payments from "../NewOfferForm/steps/Step4/Payments";
import ContractInfo from "../NewOfferForm/steps/Step4/ContractInfo";
import TextEditor from "@centic-scoring/components/TextEditor";

export default function OfferOverview({ type }: { type: View }) {
  const { offerForm } = useKOLOfferSelector();

  return (
    <Paper sx={{ px: 5, py: 6, width: "100%" }}>
      <Typography variant="h2" mb={6} sx={{ textAlign: "center" }}>
        {offerForm.name?.toLocaleUpperCase()}
      </Typography>
      <Paper sx={{ backgroundColor: "background.default", p: 4 }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={offerForm.description.logo}
              sx={{ width: "38px", height: "38px", mr: 2 }}
            />
            <Typography variant="h2" fontWeight={600}>
              {offerForm.description.title}
            </Typography>
          </Box>
          <Typography variant="body1" fontWeight={600} mt={3}>
            INTRODUCTION
          </Typography>
          <Box
            sx={{
              "& .input-container": {
                minHeight: "10px",
              },
              "& .text-container": {
                pb: "24px",
              },
            }}
          >
            <TextEditor
              onValueChange={() => {}}
              initValue={offerForm.description.text}
              inputType="markdown"
              viewMode
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="body1" fontWeight={600}>
            REQUIREMENTS
          </Typography>
          <Requirements disabled />
        </Box>
        <Box mt={5}>
          <Typography variant="body1" fontWeight={600} mb={3}>
            PAYMENTS
          </Typography>
          <Payments disabled />
        </Box>
        <Box mt={5}>
          <Typography variant="body1" fontWeight={600} mb={3}>
            CONTACT INFORMATION
          </Typography>
          <ContractInfo />
        </Box>
      </Paper>
      <Box sx={{ mt: 3 }}>
        <Navigation type={type} />
      </Box>
    </Paper>
  );
}
