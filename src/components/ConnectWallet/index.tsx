import { WalletConfig, walletsConfig } from "@centic-scoring/config/wallets";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { Box, Button, Dialog, Grid, IconButton, Paper, Typography } from "@mui/material";
import WalletItem from "./components/WalletItem";
import LoginIcon from "@mui/icons-material/Login";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import { CloseIcon } from "@centic-scoring/icons";
import { useState } from "react";
import WalletContent from "./components/WalletContent";

export default function ConnectWallet() {
  const { handleClose, handleOpen, open } = useDialogState();
  return (
    <Box>
      <Button
        variant="contained"
        id="login-web3-id"
        onClick={handleOpen}
        sx={{ whiteSpace: "nowrap" }}
      >
        Login with Web3 ID
      </Button>
      <Dialog
        PaperProps={{
          style: {
            maxWidth: "2000px",
          },
        }}
        open={open}
      >
        <Content handleClose={handleClose} />
      </Dialog>
    </Box>
  );
}

const Content = ({ handleClose }: { handleClose: () => void }) => {
  const [selectedWallet, setSlectedWallet] = useState<WalletConfig>();
  return (
    <Paper sx={{ width: "100%", position: "relative", maxWidth: "900px" }}>
      <Grid container>
        <Grid item xs={12} sm={6} sx={{ backgroundColor: "#0E1D27", py: 3 }}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h4" color={"text.primary"}>
              Login with Web3 ID
            </Typography>
            <Typography variant="body2" my={3} color="text.primary">
              Start by connecting with one of the wallets below. Be sure to store your private keys
              or seed phrase securely. Never share them with anyone.
            </Typography>
          </Box>
          <Grid
            container
            spacing={1}
            sx={{ height: "300px", overflowY: "auto" }}
            className="custom-scrollbar"
          >
            {walletsConfig().map((wallet) => {
              return (
                <Grid
                  item
                  xs={4}
                  key={wallet.id}
                  onClick={() => {
                    setSlectedWallet(wallet);
                  }}
                >
                  <WalletItem wallet={wallet} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            backgroundColor: "background.paper",
            p: 3,
            "& .row-container": {
              display: "flex",
              alignItems: "flex-start",
              my: 1,
            },
            "& .icon-container": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50px",
              height: "50px",
              borderRadius: "13px",
              padding: 3,
              backgroundColor: "#1C252C",
              overflow: "hidden",
              mr: 2,
            },
          }}
        >
          {!selectedWallet && <NonSelected />}
          {selectedWallet && <WalletContent wallet={selectedWallet} />}
        </Grid>
      </Grid>
      <IconButton onClick={handleClose} sx={{ position: "absolute", top: "12px", right: "12px" }}>
        <CloseIcon sx={{ fontSize: "1rem" }} />
      </IconButton>
    </Paper>
  );
};

const NonSelected = () => {
  return (
    <>
      <Typography variant="h5" textAlign={"center"}>
        {`What's a Web3 Wallet?`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
        }}
      >
        <Box className="row-container">
          <Box className="icon-container">
            <LoginIcon fontSize="medium" />
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={600} color="text.primary" mb={0.5}>
              Login using a wallet connection
            </Typography>
            <Typography variant="body2" color="text.label1">
              Connect your wallet with simple clicks instead of creating a new account.
            </Typography>
          </Box>
        </Box>
        <Box className="row-container">
          <Box className="icon-container">
            <AccountBalanceWalletOutlinedIcon fontSize="medium" />
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={600} color="text.primary" mb={0.5}>
              Managing digital assets in an all-in-one place
            </Typography>
            <Typography variant="body2" color="text.label1">
              Send, receive, store, and display digital assets like Bitcoin and NFTs with a wallet.
            </Typography>
          </Box>
        </Box>
        <Box className="row-container">
          <Box className="icon-container">
            <AnalyticsOutlinedIcon fontSize="medium" />
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={600} color="text.primary" mb={0.5}>
              Take control of your finance
            </Typography>
            <Typography variant="body2" color="text.label1">
              Not being limited to exchanging assets in the decentralized markets.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
