import { getTwitterLoginURL } from "@centic-scoring/api/services";
import { Link } from "@centic-scoring/components/primitives/Link";
import { useAuthContext } from "@centic-scoring/context/auth-context";
import { CloseIcon, TwitterIcon } from "@centic-scoring/icons";
import { setAPIJwt } from "@centic-scoring/utils/storage/authStorage";
import { LoadingButton } from "@mui/lab";
import { Box, Button, IconButton, TextField, Typography, Checkbox } from "@mui/material";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

type HelperText = {
  userName?: string;
  password?: string;
};
const LoginComponent = ({
  handleOpenRegister,
  handleClose,
}: {
  handleOpenRegister: () => void;
  handleClose: () => void;
}) => {
  const register = () => {
    handleClose();
    handleOpenRegister();
  };
  const { login } = useAuthContext();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<HelperText>({});
  const [confirm, setConfirm] = useState<boolean>(true);

  const handleGetLoginUrl = async () => {
    try {
      const res = await getTwitterLoginURL();
      setAPIJwt("twitterSecretToken", res.tokenSecret);
      if (typeof window !== "undefined") {
        window.open(res.url, "_self");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const handleChangeHelperText = (field: keyof HelperText, value: string) => {
    setHelperText((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleCheckData = (): boolean => {
    let isValid = true;
    if (!userName) {
      handleChangeHelperText("userName", "username cannot be empty");
      isValid = false;
    }
    if (!password) {
      handleChangeHelperText("password", "Password cannot be empty");
      isValid = false;
    }
    return isValid;
  };
  const handleCheckConfirm = () => {
    setConfirm(!confirm);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    setHelperText({});
    e.preventDefault();
    if (!handleCheckData()) {
      return;
    }
    try {
      setLoading(true);
      await login(userName, password);
      handleClose();
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        handleChangeHelperText("password", "Incorrect username or password");
      }
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "490px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignContents: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6" color={"text.secondary"} my={"auto"}>
          Login
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon sx={{ width: "1rem", height: "1rem" }} />
        </IconButton>
      </Box>
      <form onSubmit={handleLogin}>
        <TextField
          error={helperText.userName || helperText.password ? true : false}
          fullWidth
          sx={{ mb: 1 }}
          label="Username *"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          helperText={helperText?.userName || " "}
        />
        <TextField
          error={helperText.password ? true : false}
          fullWidth
          sx={{ mb: 1 }}
          label="Password *"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          helperText={helperText?.password || " "}
        />
        <Box>
          <Button
            variant="outlined"
            sx={{ height: "40px", width: "100%", my: 1 }}
            onClick={handleGetLoginUrl}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <TwitterIcon sx={{ width: "24px", height: "24px" }} />
              <Typography variant="body2" color={"text.secondary"}>
                Login with Twitter
              </Typography>
            </Box>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            ml: -1,
            my: 1,
          }}
        >
          <Checkbox
            value={confirm}
            checked={confirm}
            onClick={handleCheckConfirm}
            size="small"
          ></Checkbox>
          <Typography
            variant="small"
            color={"text.label1"}
            sx={{
              "& .special-text": {
                color: "text.active",
                fontWeight: 500,
              },
            }}
          >
            I agree to the{" "}
            <Link
              href={"/terms-of-service"}
              variant="small"
              className="special-text"
              fontWeight={500}
              underline="hover"
              sx={{ cursor: "pointer" }}
              target="_blank"
            >
              Terms of Service
            </Link>
            ,{" "}
            <Link
              href={"/cookies-policy"}
              variant="small"
              className="special-text"
              fontWeight={500}
              underline="hover"
              sx={{ cursor: "pointer" }}
              target="_blank"
            >
              Cookies Policy
            </Link>{" "}
            and{" "}
            <Link
              href={"/privacy-policy"}
              variant="small"
              className="special-text"
              fontWeight={500}
              underline="hover"
              sx={{ cursor: "pointer" }}
              target="_blank"
            >
              Privacy Policy
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="body1" color={"text.secondary"}>
            Not have an account?
          </Typography>
          <Typography
            onClick={register}
            sx={{
              cursor: "pointer",
            }}
            variant="body1"
            color={"text.active2"}
          >
            Register now
          </Typography>
        </Box>
        <LoadingButton
          loading={loading}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={confirm ? false : true}
        >
          Confirm
        </LoadingButton>
      </form>
    </Box>
  );
};
export default LoginComponent;
