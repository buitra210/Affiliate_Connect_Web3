import { centicRegister, checkEmail, checkUsername } from "@centic-scoring/api/services";
import { organizationTypeOptions } from "@centic-scoring/constant";
import { CloseIcon } from "@centic-scoring/icons";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

type HelperText = {
  userName?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  organizationName?: string;
  organizationType?: string;
  userPurpose?: string;
};

const registerInputStyle: SxProps<Theme> | undefined = {
  mb: 1,
};
const RegisterComponent = ({
  handleOpenLogin,
  handleClose,
}: {
  handleOpenLogin: () => void;
  handleClose: () => void;
}) => {
  const login = () => {
    handleClose();
    handleOpenLogin();
  };
  const [step, setStep] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [organizationName, setOrganizationName] = useState<string>("");
  const [organizationType, setOrganizationType] = useState<string>("");
  // eslint-disable-next-line no-unused-vars
  const [userPurpose, setUserPurpose] = useState<string>("");
  const [helperText, setHelperText] = useState<HelperText>({});

  const handleSetHelperText = (field: keyof HelperText, value: string) => {
    setHelperText((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleCheckEmail = (e: any) => {
    if (
      !e.target.value
        ?.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      handleSetHelperText("email", "Invalid email address");
      return false;
    } else {
      handleSetHelperText("email", "");
      return true;
    }
  };
  const handleCheckUserName = (e: any) => {
    if (!e.target.value) {
      handleSetHelperText("userName", "User name cannot be empty");
    } else {
      handleSetHelperText("userName", "");
    }
  };
  const handleCheckPassword = (e: any) => {
    if (!e.target.value) {
      handleSetHelperText("password", "User name cannot be empty");
    } else {
      handleSetHelperText("password", "");
    }
  };
  const handleNextStep = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleCheckData1()) {
      return;
    }
    try {
      setLoading(true);
      let isValid = true;
      const userNameCheck = await checkUsername(userName);
      const userEmailCheck = await checkEmail(email);
      if (!userNameCheck.valid) {
        handleSetHelperText("userName", userNameCheck.message);
        isValid = false;
      }
      if (!userEmailCheck.valid) {
        handleSetHelperText("email", userEmailCheck.message);
        isValid = false;
      }
      if (isValid) {
        setStep((prev) => prev + 1);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
  const handleCheckData1 = (): boolean => {
    setHelperText({});
    let valid = true;
    if (!email) {
      handleSetHelperText("email", "Email is required");
      valid = false;
    }
    // if (email.startsWith("@") || !email.includes("@") || email.includes(" ")) {
    if (
      !email
        ?.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      handleSetHelperText("email", "Invalid email address");
      valid = false;
    }
    if (!userName) {
      handleSetHelperText("userName", "Username cannot be empty");
      valid = false;
    }
    if (!password) {
      handleSetHelperText("password", "Password cannot be empty");
      valid = false;
    }
    if (!passwordConfirmed) {
      handleSetHelperText("passwordConfirm", "Password cannot be empty");
      valid = false;
    }
    if (password.length < 8) {
      handleSetHelperText("password", "Password need at least 8 character");
      valid = false;
    }
    //check password
    if (password !== passwordConfirmed) {
      handleSetHelperText("passwordConfirm", "Passwords do not match");
      valid = false;
    }
    return valid;
  };
  const handleCheckData2 = (): boolean => {
    setHelperText({});
    let valid = true;
    if (!organizationName) {
      handleSetHelperText("organizationName", "Please fill in the value");
      valid = false;
    }
    if (!organizationType) {
      handleSetHelperText("organizationType", "Please fill in the value");
      valid = false;
    }
    // if (!userPurpose) {
    //   handleSetHelperText("userPurpose", "Please fill in the value");
    //   valid = false;
    // }
    return valid;
  };
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!handleCheckData2()) {
      setLoading(false);
      return;
    }
    try {
      await centicRegister({
        userName,
        password,
        email,
        organization: organizationName,
        organizationType,
        userPurpose,
      });
      toast("Register success", { type: "success" });
      handleClose();
      handleOpenLogin();
    } catch (error: any) {
      toast("Register failed", { type: "error" });
    }
    setLoading(false);
  };
  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      {step === 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              alignContents: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" my="auto" color={"text.secondary"}>
              Register
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ width: "1rem", height: "1rem" }} />
            </IconButton>
          </Box>
          <form onSubmit={handleNextStep}>
            <TextField
              error={helperText.email ? true : false}
              fullWidth
              label="Email Address *"
              variant="outlined"
              onChange={(e) => {
                handleCheckEmail(e);
                setEmail(e.target.value);
              }}
              type="text"
              value={email}
              helperText={helperText.email || " "}
              sx={registerInputStyle}
            />
            <TextField
              error={helperText.userName ? true : false}
              fullWidth
              label="Username *"
              onChange={(e) => {
                handleCheckUserName(e);
                setUserName(e.target.value);
              }}
              value={userName}
              helperText={helperText.userName || " "}
              sx={registerInputStyle}
            />
            <TextField
              error={helperText.password ? true : false}
              fullWidth
              label="Password *"
              type="password"
              onChange={(e) => {
                handleCheckPassword(e);
                setPassword(e.target.value);
              }}
              value={password}
              helperText={helperText.password || " "}
              sx={registerInputStyle}
            />
            <TextField
              error={helperText.passwordConfirm ? true : false}
              fullWidth
              label="Confirm Password *"
              type="password"
              value={passwordConfirmed}
              onChange={(e) => setPasswordConfirmed(e.target.value)}
              helperText={helperText.passwordConfirm || " "}
              sx={registerInputStyle}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                my: 2,
              }}
            >
              <Typography variant="body1" color={"text.secondary"}>
                Already have an account?
              </Typography>
              <Typography
                onClick={login}
                sx={{
                  cursor: "pointer",
                }}
                variant="body1"
                color={"text.active2"}
              >
                Login here
              </Typography>
            </Box>
            <LoadingButton
              loading={loading}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Confirm
            </LoadingButton>
          </form>
        </>
      )}
      {step === 1 && (
        <>
          <Box
            sx={{
              display: "flex",
              alignContents: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" my="auto" color={"text.secondary"}>
              More about you
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ width: "1rem", height: "1rem" }} />
            </IconButton>
          </Box>
          <form onSubmit={handleRegister}>
            <TextField
              error={helperText.organizationName ? true : false}
              fullWidth
              label="Organization name *"
              onChange={(e) => setOrganizationName(e.target.value)}
              value={organizationName}
              helperText={helperText.organizationName || " "}
              sx={registerInputStyle}
            />
            <TextField
              error={helperText.organizationType ? true : false}
              fullWidth
              label="Organization type *"
              onChange={(e) => setOrganizationType(e.target.value)}
              value={organizationType}
              helperText={helperText.organizationType || " "}
              sx={registerInputStyle}
              select
            >
              {organizationTypeOptions.map((item) => {
                return (
                  <MenuItem value={item.key} key={item.key}>
                    {item.value}
                  </MenuItem>
                );
              })}
            </TextField>

            <Button
              fullWidth
              onClick={handleBack}
              variant="outlined"
              color="primary"
              sx={{ my: 2 }}
            >
              Back
            </Button>
            <LoadingButton
              loading={loading}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Confirm
            </LoadingButton>
          </form>
        </>
      )}
    </Box>
  );
};
export default RegisterComponent;
