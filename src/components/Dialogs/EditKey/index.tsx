/* eslint-disable no-unused-vars */
import { editApiKey, revokeKey } from "@centic-scoring/api/services";
import { CloseIcon } from "@centic-scoring/icons";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  name: string;
  condition: number;
  operator: number;
  keyId: string;
  handleRefresh: () => void;
};

const options: { title: string; value: number }[] = [
  {
    title: "None",
    value: 0,
  },
  {
    title: "Greater",
    value: 1,
  },
  {
    title: "Less than",
    value: 2,
  },
  {
    title: "Equal",
    value: 3,
  },
];

export default function EditKey({ name, condition, operator, keyId, handleRefresh }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [editName, setName] = useState<string>(name);
  const [editCondition, setCondition] = useState<number>(condition);
  const [editOperator, setOperator] = useState<number>(operator);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingRevoke, setLoadingRevoke] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleEdit = async () => {
    setLoading(true);
    try {
      const res = await editApiKey({
        keyId: keyId || "",
        condition: editCondition,
        operator: editOperator,
      });
      handleClose();
      handleRefresh();
    } catch (error) {
      //pass
    }
    setLoading(false);
  };

  const handleRevokeKey = async () => {
    try {
      setLoadingRevoke(true);
      const res = await revokeKey(keyId);
      handleClose();
      handleRefresh();
      toast("Revoke success", { type: "success" });
    } catch (error) {
      toast("Revoke failed", { type: "error" });
    }
    setLoadingRevoke(false);
  };
  return (
    <>
      <Dialog open={open}>
        <Box
          sx={{
            p: 3,
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
              Edit Key
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ width: "1rem", height: "1rem" }} />
            </IconButton>
          </Box>
          <TextField fullWidth sx={{ my: 1 }} label="Name" value={editName} disabled />
          <TextField
            fullWidth
            sx={{
              my: 1,
              "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button":
                {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
            }}
            label="Condition"
            type="number"
            value={editCondition}
            onChange={(e) => {
              setCondition(Math.max(0, Number(e.target.value)));
            }}
          />
          <TextField
            fullWidth
            select
            sx={{ mt: 1, mb: 3 }}
            label="Operator"
            type="number"
            value={editOperator}
            onChange={(e) => {
              setOperator(Number(e.target.value));
            }}
          >
            {options.map((item, index: number) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.title}
                </MenuItem>
              );
            })}
          </TextField>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 2,
            }}
          >
            <LoadingButton
              loading={loadingRevoke}
              onClick={handleRevokeKey}
              sx={(theme) => ({
                fontWeight: 600,
                color: theme.palette.text.active,
              })}
            >
              Revoke
            </LoadingButton>
          </Box>
          <LoadingButton
            loading={loading}
            onClick={handleEdit}
            fullWidth
            variant="contained"
            color="primary"
          >
            Confirm
          </LoadingButton>
        </Box>
      </Dialog>
      <Button
        onClick={handleOpen}
        sx={(theme) => ({
          color: theme.palette.text.active2,
          ml: 1,
          mr: -2,
          ":hover": {
            backgroundColor: "transparent",
            color: theme.palette.text.active,
          },
        })}
      >
        <Typography variant="body2" fontWeight={600}>
          Edit
        </Typography>
      </Button>
    </>
  );
}
