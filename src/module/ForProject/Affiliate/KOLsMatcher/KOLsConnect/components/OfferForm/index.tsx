import { Box, Stepper, stepConnectorClasses, StepConnector, Step, StepLabel } from "@mui/material";
import useKOLsConnectparams from "../../hooks/useKOLsConnectParams";
import Step1 from "../NewOfferForm/steps/Step1";
import Step2 from "../NewOfferForm/steps/Step2";
import Step3 from "../NewOfferForm/steps/Step3";
import Step4 from "../NewOfferForm/steps/Step4";
import StepperIcon from "@centic-scoring/module/Web3Growth/Campaigns/CampaignDetail/StepperIcon";
import Steplabel from "@centic-scoring/module/Web3Growth/Campaigns/CampaignDetail/StepLabel";

const steps = ["Introduction", "Requirements", "Payment", "Review"];

export default function OfferForm() {
  const { step } = useKOLsConnectparams();
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", overflowX: "hidden", mt: 2 }}>
        <Stepper
          activeStep={step - 1}
          alternativeLabel
          sx={{
            width: "100%",
            maxWidth: "1000px",
            [`& .${stepConnectorClasses.active} .MuiStepConnector-line`]: {
              borderColor: "#52B95F",
              borderWidth: "2px",
            },
            [`& .${stepConnectorClasses.completed} .MuiStepConnector-line`]: {
              borderColor: "#52B95F",
              borderWidth: "2px",
            },
            [`& .${stepConnectorClasses.disabled} .MuiStepConnector-line`]: {
              borderColor: "#6D8198",
              borderWidth: "2px",
              borderTopStyle: "dashed",
            },
          }}
          connector={<StepConnector />}
        >
          {steps.map((item, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperIcon}>
                  <Box sx={{ position: "relative", left: "calc(50% - 10px)" }}>
                    <Steplabel currentStep={step - 1} stepIndex={index} text={item} />
                  </Box>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box sx={{ mt: 5 }}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </Box>
    </>
  );
}
