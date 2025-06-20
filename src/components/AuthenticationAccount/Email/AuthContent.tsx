import { confirmUserEmail } from "@centic-scoring/api/services";
import CenticLoading from "@centic-scoring/components/CenticLoading";
import { VerifyEmail, CheckEmailIcon } from "@centic-scoring/icons";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AuthContent({ handleClose }: { handleClose: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      await confirmUserEmail();
      if (step === 1) {
        setStep(2);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };
  return (
    <Box sx={{ backgroundColor: "background.paper", p: 3, textAlign: "center", maxWidth: "400px" }}>
      {step === 1 && <SendEmail handleSendEmail={handleSendEmail} loading={loading} />}
      {step === 2 && (
        <CheckEmail handleSendEmail={handleSendEmail} loading={loading} handleClose={handleClose} />
      )}
    </Box>
  );
}

function SendEmail({
  handleSendEmail,
  loading,
}: {
  handleSendEmail: () => void;
  loading: boolean;
}) {
  return (
    <Box>
      <VerifyEmail sx={{ fontSize: "4.5rem" }} />
      <Typography variant="h4" paddingY={3}>
        Verify your email address
      </Typography>
      <Typography variant="body2" color="text.label1">
        A verification email has been sent to your email
      </Typography>
      <Typography variant="body2" color="text.label1">
        Please check your email and click the link provided in the email to complete your account
        verification.
      </Typography>
      <LoadingButton
        loading={loading}
        onClick={handleSendEmail}
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
      >
        Send verification email
      </LoadingButton>
    </Box>
  );
}

function CheckEmail({
  handleSendEmail,
  handleClose,
  loading,
}: {
  handleSendEmail: () => void;
  handleClose: () => void;
  loading: boolean;
}) {
  return (
    <Box>
      <CheckEmailIcon sx={{ fontSize: "4.5rem" }} />
      <Typography variant="h4" paddingY={3}>
        Check your inbox please!
      </Typography>
      <Typography variant="body2" color="text.label1">
        We&#39;ve already sent out the verification link.
      </Typography>
      <Typography variant="body2" color="text.label1">
        Please check it and confirm it&#39;s really you.
      </Typography>
      <Button variant="contained" fullWidth onClick={handleClose} sx={{ my: 3 }}>
        Sure!
      </Button>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="small" color="text.label1">
          Don&#39;t get e-mail?{" "}
          <Typography
            component="span"
            variant="small"
            color="text.active"
            fontWeight={500}
            sx={{ cursor: "pointer", mr: 0.5 }}
            onClick={handleSendEmail}
          >
            Send it again
          </Typography>
        </Typography>
        {loading && <CenticLoading size={20} />}
      </Box>
    </Box>
  );
}
