import { createApiKey } from "@centic-scoring/api/services";
import { StateStatus } from "@centic-scoring/components/component";
import { AddIcon, CloseIcon } from "@centic-scoring/icons";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import SuccessDialog from "../SuccessDialog";
import FailDialog from "../FailDialog";

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
type HelperText = {
  name?: string;
  condition?: string;
  operator?: string;
};
export default function CreateKey({ handleRefresh }: { handleRefresh: () => void }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [editName, setName] = useState<string>("");
  const [editCondition, setCondition] = useState<number>(0);
  const [editOperator, setOperator] = useState<number>(0);
  const [status, setStatus] = useState<StateStatus>("IDLE");
  const [helperText, setHelperText] = useState<HelperText>({});
  const [errorText, setErrorText] = useState<string>("");

  const handleSetHelperText = (key: keyof HelperText, value: string) => {
    setHelperText((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleCheckName = (value: string) => {
    if (!value) {
      handleSetHelperText("name", "Key name cannot be empty");
    } else {
      if (editName.length > 30) {
        handleSetHelperText("name", "Key name too long");
      } else {
        handleSetHelperText("name", "");
      }
    }
  };
  const handleCheckData = (): boolean => {
    if (!editName) {
      return false;
    }
    if (editName.length > 30) {
      return false;
    }
    return true;
  };
  const handleClose = () => {
    setOpen(false);
    setStatus("IDLE");
  };
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const handleCreateKey = async (e: any) => {
    e.preventDefault();
    if (!handleCheckData()) {
      return;
    }
    const scoreId = router.query?.id;
    try {
      setStatus("PROCESSING");
      await createApiKey({
        condition: editCondition,
        keyName: editName,
        scoreId: scoreId?.toString() || "",
        operator: editOperator,
      });
      handleRefresh();
      setStatus("SUCCESS");
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Unknow error");
      setStatus("FAILED");
    }
  };

  return (
    <>
      <Dialog open={open}>
        <Box
          sx={{
            p: 3,
          }}
        >
          {(status === "IDLE" || status === "PROCESSING") && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignContents: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="h6" color={"text.secondary"} my={"auto"}>
                  New Key
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon sx={{ width: "1rem", height: "1rem" }} />
                </IconButton>
              </Box>
              <form onSubmit={handleCreateKey}>
                <TextField
                  error={helperText.name ? true : false}
                  fullWidth
                  label="Name *"
                  value={editName}
                  onChange={(e) => {
                    handleCheckName(e.target.value);
                    setName(e.target.value);
                  }}
                  helperText={helperText.name || " "}
                  inputProps={{
                    maxLength: 30,
                  }}
                />
                <TextField
                  fullWidth
                  sx={{
                    "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                  }}
                  label="Condition *"
                  type="number"
                  value={editCondition}
                  onChange={(e) => {
                    setCondition(Math.max(0, Number(e.target.value)));
                  }}
                />
                <TextField
                  fullWidth
                  select
                  sx={{ mt: 3, mb: 3 }}
                  label="Operator *"
                  type="number"
                  value={1}
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

                <LoadingButton
                  loading={status === "PROCESSING"}
                  fullWidth
                  variant="contained"
                  color="primary"
                  type={"submit"}
                  // onClick={handleCreateKey}
                >
                  Confirm
                </LoadingButton>
              </form>
            </>
          )}
          {status === "SUCCESS" && (
            <SuccessDialog onClick={handleClose} text="You have succeeded in creating API Key" />
          )}
          {status === "FAILED" && <FailDialog onClick={() => setStatus("IDLE")} text={errorText} />}
        </Box>
      </Dialog>
      {/* <Button variant="outlined" color="primary" onClick={handleOpen}> */}

      <Button variant="outlined" color="primary">
        <AddIcon
          sx={{
            mr: 1,
            "& path": { fill: "#009FDB" }, // need config later
          }}
        />{" "}
        New Key
      </Button>
    </>
  );
}
