import { CopyIcon, WalletIcon } from "@centic-scoring/icons";
import { formatAddress } from "@centic-scoring/utils/string/stringUtils";
import { Box, Button, IconButton, Paper, Popover, Typography } from "@mui/material";
import { MouseEvent, useCallback, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { toast } from "react-toastify";
import SignatureRequire from "./SignatureRequire";
import {
  deleteAPIJwt,
  getAPIJwtWithKey,
  removeAPPStorage,
} from "@centic-scoring/utils/storage/authStorage";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";

export default function ConnectedWallet() {
  const { address } = useAccount();
  const [openUserProfile, setOpenUserProfile] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {
    handleClose: closeRequireSig,
    handleOpen: openRequireSig,
    open: requireSig,
  } = useDialogState();

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenUserProfile(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setOpenUserProfile(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <SignatureRequire
        handleClose={closeRequireSig}
        handleOpen={openRequireSig}
        open={requireSig}
      />
      <Button variant="outlined" onClick={handleOpen}>
        <WalletIcon sx={{ mr: 1 }} /> {formatAddress(String(address))}
      </Button>
      {address && (
        <div
          id="ga4-trava-connected-wallet"
          style={{
            position: "absolute",
            zIndex: -1000000,
            overflow: "hidden",
            width: "1px",
            color: "transparent",
          }}
          key={address}
        >
          {address}
        </div>
      )}
      <Popover
        anchorEl={anchorEl}
        open={openUserProfile}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleCloseProfile}
        slotProps={{
          paper: {
            style: {
              backgroundColor: "transparent",
              borderRadius: "16px",
            },
          },
        }}
      >
        <Content onLoginClick={openRequireSig} />
      </Popover>
    </Box>
  );
}

const Content = ({ onLoginClick }: { onLoginClick: () => void }) => {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const checkVerifiedWallet = useCallback(() => {
    try {
      const portfolioJwt = getAPIJwtWithKey("portfolio", String(address));
      if (portfolioJwt) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }, [address]);

  const verified = checkVerifiedWallet();

  const handleDisConnect = () => {
    disconnect();
    deleteAPIJwt(`portfolio`);
    removeAPPStorage("skipWalletVerification");
    localStorage.removeItem(`wagmi.${connector?.id}.shimDisconnect`);
  };
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <WalletIcon sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight={600}>
          {formatAddress(String(address))}
        </Typography>
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(String(address)).then(() => {
              toast.success("Coppied to clipboard!");
            });
          }}
        >
          <CopyIcon fontSize="small" color="info" />
        </IconButton>
      </Box>
      {verified && (
        <Typography
          variant="body2"
          color={"text.success"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <CheckCircleOutlineIcon fontSize="small" sx={{ mb: 0.2, mr: 1 }} /> Wallet Verified
        </Typography>
      )}
      {!verified && (
        <Typography
          variant="body2"
          color={"text.error"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <CancelOutlinedIcon fontSize="small" sx={{ mb: 0.2, mr: 1 }} /> Wallet Not Verified
        </Typography>
      )}
      <Box
        sx={{ width: "100%", height: "0px", borderTop: "1px solid", borderColor: "divider", my: 2 }}
      />
      {verified && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              "& .item": {
                backgroundColor: "background.paper2",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
                borderRadius: 2,
                mt: 1,
                textDecoration: "none",
                mr: 1,
                minWidth: "150px",
                color: "text.active",
              },
            }}
          >
            <Box component={"a"} target="_blank" href="/portfolio" className="item">
              <Typography variant="body2" fontWeight={500} color="text.primary">
                My Portfolio
              </Typography>
              <ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />
            </Box>
            <Box component={"a"} href="/portfolio/profile" target="_blank" className="item">
              <Typography variant="body2" fontWeight={500} color="text.primary">
                My Profile
              </Typography>
              <ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", mt: 3, cursor: "pointer" }}
            onClick={handleDisConnect}
          >
            <Typography
              variant="small"
              color={"text.secondary"}
              mr={1}
              sx={{ "&:hover": { color: "text.active", fontWeight: 500 } }}
            >
              Disconnect
            </Typography>
            <LogoutIcon sx={{ color: "text.active", fontSize: "1rem" }} />
          </Box>
        </>
      )}
      {!verified && (
        <Box>
          <Typography variant="body1" fontWeight={600} mb={2}>
            Log into Centic
          </Typography>
          <Typography variant="body2" color="text.label1">
            Prove you are the holder of the address.
          </Typography>
          <Button size="small" sx={{ my: 2 }} variant="contained" fullWidth onClick={onLoginClick}>
            Login
          </Button>
          <Button size="small" variant="outlined" fullWidth onClick={handleDisConnect}>
            Disconnect
          </Button>
        </Box>
      )}
    </Paper>
  );
};
