import { useKOLAuthContext } from "@centic-scoring/context/kol-auth-context";
import { Box } from "@mui/material";
import LoginButton from "./LoginButton";
import LoggedInButton from "./LoggedInButton";

export default function KOLProfile() {
  const { isLoggedIn } = useKOLAuthContext();
  return (
    <Box>
      {!isLoggedIn && <LoginButton />}
      {isLoggedIn && <LoggedInButton />}
    </Box>
  );
}
