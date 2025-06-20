import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CheckEmailIcon, CloseIcon } from "@centic-scoring/icons";
import { changePasswordAction } from "@centic-scoring/api/services";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import CenticLoading from "@centic-scoring/components/CenticLoading";

type HelperText = {
  oldPassword?: string;
  newPassword?: string;
  passwordConfirm?: string;
};

export default function ChangeContent({ handleClose }: { handleClose: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<HelperText>({});
  const [step, setStep] = useState<number>(1);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordConfirmed, setPasswordConfirmed] = useState<string>("");

  const handleSetHelperText = (field: keyof HelperText, value: string) => {
    setHelperText((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckOldPassword = (e: any) => {
    if (!e.target.value) {
      handleSetHelperText("oldPassword", "User name cannot be empty");
    } else {
      handleSetHelperText("oldPassword", "");
    }
  };

  const handleCheckNewPassword = (e: any) => {
    if (!e.target.value) {
      handleSetHelperText("newPassword", "User name cannot be empty");
    } else if (e.target.value && newPassword.length < 8) {
      handleSetHelperText("newPassword", "Password need at least 8 character");
    } else {
      handleSetHelperText("newPassword", "");
    }
  };

  const handleCheckData = (): boolean => {
    setHelperText({});
    let valid = true;
    if (!oldPassword) {
      handleSetHelperText("oldPassword", "Current Password is required");
      valid = false;
    }
    if (!newPassword) {
      handleSetHelperText("newPassword", "New Password is required");
      valid = false;
    }
    if (newPassword.length < 8) {
      handleSetHelperText("newPassword", "Password need at least 8 character");
      valid = false;
    }
    if (!passwordConfirmed) {
      handleSetHelperText("passwordConfirm", "Password cannot be empty");
      valid = false;
    }
    if (oldPassword === newPassword) {
      handleSetHelperText("newPassword", "New Password should not be the same as Current Password");
      valid = false;
    }
    if (newPassword !== passwordConfirmed) {
      handleSetHelperText("passwordConfirm", "Password do not match");
      valid = false;
    }
    return valid;
  };

  const handleChangePassword = async () => {
    if (!handleCheckData()) {
      return;
    }
    setLoading(true);
    try {
      await changePasswordAction({
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
      setStep(2);
    } catch (error) {
      toast.error("Invalid old password");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: "500px" }}>
      {step == 1 && (
        <>
          <Box
            sx={{
              display: "flex",
              alignContents: "center",
              justifyContent: "space-between",
              mb: 5,
            }}
          >
            <Typography variant="h6" color={"text.secondary"} my={"auto"}>
              Change Password
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ width: "1rem", height: "1rem" }} />
            </IconButton>
          </Box>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangePassword();
            }}
          >
            <TextField
              error={helperText.oldPassword ? true : false}
              fullWidth
              sx={{ mb: 1 }}
              label="Current Password *"
              type="password"
              onChange={(e) => {
                setOldPassword(e.target.value);
                handleCheckOldPassword(e);
              }}
              helperText={helperText?.oldPassword || " "}
            />
            <TextField
              error={helperText.newPassword ? true : false}
              fullWidth
              sx={{ mb: 1 }}
              label="New Password *"
              type="password"
              onChange={(e) => {
                setNewPassword(e.target.value);
                handleCheckNewPassword(e);
              }}
              helperText={helperText?.newPassword || " "}
            />
            <TextField
              error={helperText.passwordConfirm ? true : false}
              fullWidth
              sx={{ mb: 1 }}
              label="Confirm Password *"
              type="password"
              onChange={(e) => {
                setPasswordConfirmed(e.target.value);
              }}
              helperText={helperText?.passwordConfirm || " "}
            />
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"100%"}
            >
              <Button variant="outlined" onClick={handleClose} fullWidth sx={{ mr: 1 }}>
                Cancel
              </Button>
              <LoadingButton loading={loading} type="submit" variant="contained" fullWidth>
                Confirm
              </LoadingButton>
            </Box>
          </form>
        </>
      )}
      {step == 2 && (
        <Box textAlign={"center"}>
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
                onClick={handleChangePassword}
              >
                Send it again
              </Typography>
            </Typography>
            {loading && <CenticLoading size={20} />}
          </Box>
        </Box>
      )}
    </Box>
  );
}
