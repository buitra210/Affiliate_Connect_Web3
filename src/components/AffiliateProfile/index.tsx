import { useAffiliateAuthSelector } from "@centic-scoring/redux/hook";
import Login from "./components/Login";
import LoggedIn from "./components/LoggedIn";
import { Box } from "@mui/material";
import AuthDataFetcher from "./components/AuthDataFetcher";

export default function AffiliateProfile() {
  const { isLoggedIn } = useAffiliateAuthSelector();

  return (
    <Box>
      <AuthDataFetcher />
      {!isLoggedIn && <Login />}
      {isLoggedIn && <LoggedIn />}
    </Box>
  );
}
