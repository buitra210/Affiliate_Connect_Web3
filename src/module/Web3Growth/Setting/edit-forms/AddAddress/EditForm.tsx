/* eslint-disable no-unused-vars */
import { postFiles } from "@centic-scoring/api/services/web3-growth/campaign";
import { addAddresses, editAddresses } from "@centic-scoring/api/services/web3-growth/setting";
import { chainsConfig } from "@centic-scoring/config/chain";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppSelector, useAppDispatch } from "@centic-scoring/redux/hook";
import { getAddressesSetting } from "@centic-scoring/redux/slices/setting/fetchFunctions";
import { LoadingButton } from "@mui/lab";
import {
  SxProps,
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  Autocomplete,
  MenuItem,
  Avatar,
  Checkbox,
  Button,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const tagsRow: SxProps = {
  display: "flex",
  alignItems: "center",
  py: 1,
};

//options
export type ABIOptions = "Content" | "From file url" | "From file";
const abiInputOptions: ABIOptions[] = ["Content", "From file", "From file url"];
const BASE_TAG = {
  contract: "Contract - Contract Address",
  released_token: "Released Token - Released token of your project",
  treasury: "Treasury - Address for hold protocol assets",
};

const initHelperText = {
  name: " ",
  dappId: " ",
  chain: " ",
  abi: " ",
  address: " ",
};

type Props = {
  handleClose: () => void;
  initData?: {
    name: string;
    address: string;
    chain: { label: string; value: string; avatar: string };
    dappId: string;
    baseTag: string[];
    otherTags: string;
    abiInputType?: ABIOptions;
    abiUrl?: string;
    abiContent?: string;
    files?: FileList;
  };
  editMode?: boolean;
};

export default function EditForm({ handleClose, initData, editMode }: Props) {
  const { data } = useAppSelector((state) => state.setting.dApp);
  const { id } = useURLQuery();
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const [dappId, setDappId] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [chain, setChain] = useState<{ label: string; value: string; avatar: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [baseTags, setBaseTags] = useState<{ [key: string]: boolean }>({});
  const [otherTag, setOtherTag] = useState<{
    enabled: boolean;
    text: string;
  }>({
    enabled: false,
    text: "",
  });
  const [helperText, setHelperText] = useState<{
    name: string;
    dappId: string;
    chain: string;
    abi: string;
    address: string;
  }>(initHelperText);
  const [abiInputType, setAbiInputType] = useState<ABIOptions>("Content");
  const [abiContent, setAbiContent] = useState<string>();
  const [abiUrl, setAbiUrl] = useState<string>();
  const [files, setFiles] = useState<FileList>();
  const ref = useRef<HTMLInputElement>(null);

  const handleUploadFile = () => {
    ref?.current?.click();
  };

  const handleChangeHelperText = (key: keyof typeof helperText, value: string) => {
    setHelperText((prev) => ({ ...prev, [key]: value }));
  };
  const handleUpdateBaseType = (key: string, value: boolean) => {
    setBaseTags((prev) => ({ ...prev, [key]: value }));
  };

  const checkInput = () => {
    let valid = true;
    setHelperText(initHelperText);
    if (!name) {
      handleChangeHelperText("name", "Name cannot be empty!");
      valid = false;
    }
    if (!dappId) {
      handleChangeHelperText("dappId", "Dapp cannot be empty!");
      valid = false;
    }
    if (!address) {
      handleChangeHelperText("address", "Address cannot be empty!");
      valid = false;
    }
    if (!chain) {
      handleChangeHelperText("chain", "Chain cannot be empty!");
      valid = false;
    }
    if (abiInputType === "Content" && !abiContent) {
      handleChangeHelperText("abi", "ABI Content cannot be empty!");
      valid = false;
    }
    if (abiInputType === "From file" && !files?.length) {
      handleChangeHelperText("abi", "Please provide ABI file!");
      valid = false;
    }
    if (abiInputType === "From file url" && !abiUrl) {
      handleChangeHelperText("abi", "ABI URL cannot be empty!");
      valid = false;
    }
    return valid;
  };

  const handleConfirm = async () => {
    if (checkInput()) {
      try {
        setLoading(true);
        let uploadUrl = "";
        if (abiInputType === "From file") {
          const filesRes = await postFiles(files);
          uploadUrl = filesRes?.urls![0] || "";
        }
        if (editMode) {
          await editAddresses({
            address,
            chainId: chain?.value || "",
            name,
            id,
            dapp: dappId,
            tags: [
              ...Object.entries(baseTags)
                .filter(([k, v]) => v)
                .map(([k, v]) => k),
              ...(otherTag.enabled ? [otherTag.text] : []),
            ],
            ...(abiInputType === "Content" && { abi: JSON.parse(abiContent || "") }),
            ...(abiInputType === "From file" && { abiFileUrl: uploadUrl }),
            ...(abiInputType === "From file url" && { abiFileUrl: abiUrl }),
          });
          toast.success("Edit address successfully");
        } else {
          await addAddresses({
            address,
            chainId: chain?.value || "",
            name,
            id,
            dapp: dappId,
            tags: [
              ...Object.entries(baseTags)
                .filter(([k, v]) => v)
                .map(([k, v]) => k),
              ...(otherTag.enabled ? [otherTag.text] : []),
            ],
            ...(abiInputType === "Content" && { abi: JSON.parse(abiContent || "") }),
            ...(abiInputType === "From file" && { abiFileUrl: uploadUrl }),
            ...(abiInputType === "From file url" && { abiFileUrl: abiUrl }),
          });
          toast.success("Add address successfully");
        }
        handleClose();
        dispatch(getAddressesSetting({ id }));
        setLoading(false);
      } catch (error) {
        toast.error((error as Error).message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (initData) {
      setName(initData.name);
      setAddress(initData.address);
      setChain(initData.chain);
      setDappId(initData.dappId);
      setBaseTags(Object.fromEntries(initData.baseTag.map((i) => [i, true])));
      if (initData.otherTags) {
        setOtherTag({
          enabled: true,
          text: initData.otherTags,
        });
      }
      setAbiContent(JSON.stringify(initData.abiContent));
      setAbiUrl(initData.abiUrl);
    }
  }, [initData]);

  return (
    <Paper
      sx={{
        p: 3,
        "& .label": {
          mb: 1,
        },
      }}
    >
      <Box>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Address Settings
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography className="label" variant="body2" color="text.secondary">
            Name
          </Typography>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(helperText.name?.trim())}
            helperText={helperText.name}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="label" variant="body2" color="text.secondary">
            Address
          </Typography>
          <TextField
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={Boolean(helperText.address?.trim())}
            helperText={helperText.address}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="label" variant="body2" color="text.secondary">
            Chain
          </Typography>
          <Autocomplete
            value={chain}
            key={chain?.label}
            fullWidth
            onChange={(_, newValue) => {
              setChain(newValue || undefined);
            }}
            options={Object.entries(chainsConfig).map(([chainId, value]) => {
              return { label: value.name, value: chainId, avatar: value.img };
            })}
            renderInput={(props) => {
              return (
                <TextField
                  {...props}
                  error={Boolean(helperText.chain?.trim())}
                  helperText={helperText.chain}
                />
              );
            }}
            renderOption={(props, option) => {
              return (
                <MenuItem {...props}>
                  <Avatar
                    src={option?.avatar || "#"}
                    sx={{ width: "24px", height: "24px", mr: 1 }}
                  />
                  {option.label}
                </MenuItem>
              );
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="label" variant="body2" color="text.secondary">
            Dapp
          </Typography>
          <TextField
            fullWidth
            select
            value={dappId}
            onChange={(e) => setDappId(e.target.value)}
            error={Boolean(helperText.dappId?.trim())}
            helperText={helperText.dappId}
          >
            {data?.docs?.map((i) => {
              return (
                <MenuItem key={i.id} value={i.id}>
                  {i.name}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className="label" variant="body2" color="text.secondary">
            Tags
          </Typography>

          {Object.entries(BASE_TAG).map(([key, label]) => {
            return (
              <Box key={key} sx={tagsRow}>
                <Checkbox
                  color="info"
                  checked={Boolean(baseTags[key])}
                  onChange={(_, checked) => {
                    handleUpdateBaseType(key, checked);
                  }}
                />
                <Typography variant="body1" color="text.primary">
                  {label}
                </Typography>
              </Box>
            );
          })}
          <Box sx={tagsRow}>
            <Checkbox
              color="info"
              checked={otherTag["enabled"]}
              value={otherTag["enabled"]}
              onChange={(_, checked) => {
                setOtherTag((prev) => ({ ...prev, enabled: checked }));
              }}
            />
            <Typography variant="body1" color="text.primary" mr={3}>
              Others
            </Typography>
            <TextField
              disabled={!otherTag["enabled"]}
              fullWidth
              sx={{ maxWidth: "320px" }}
              value={otherTag["text"]}
              onChange={(e) => {
                setOtherTag((prev) => ({ ...prev, text: e.target.value }));
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="label" variant="body2" color="text.secondary">
            ABI
          </Typography>
          <TextField
            fullWidth
            select
            value={abiInputType}
            onChange={(e) => {
              setAbiInputType(e.target.value as ABIOptions);
            }}
          >
            {abiInputOptions.map((option) => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          {abiInputType === "From file" && (
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} display={"flex"} alignItems={"center"}>
                  <Button variant="outlined" onClick={handleUploadFile}>
                    <FileUploadIcon /> Upload file
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} display={"flex"} alignItems={"center"}>
                  {Boolean(files?.length) && (
                    <Typography variant="body2" color="text.secondary">
                      {files![0]?.name}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <input
                type="file"
                accept="application/JSON"
                style={{ display: "none" }}
                ref={ref}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const file = e.target.files[0];
                    if (file.type === "application/json" || file.name.endsWith(".json")) {
                      setFiles(e.target.files);
                    } else {
                      toast.error("File must be *.json!");
                    }
                  }
                }}
              />
            </Box>
          )}
          {abiInputType === "From file url" && (
            <TextField
              fullWidth
              placeholder="Enter file url"
              value={abiUrl}
              onChange={(e) => setAbiUrl(e.target.value)}
              error={Boolean(helperText.abi?.trim())}
              helperText={helperText.abi}
            />
          )}
          {abiInputType === "Content" && (
            <TextField
              fullWidth
              multiline
              minRows={5}
              maxRows={25}
              placeholder="Enter ABI JSON"
              value={abiContent}
              onChange={(e) => setAbiContent(e.target.value)}
              error={Boolean(helperText.abi?.trim())}
              helperText={helperText.abi}
            />
          )}
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", mt: 2, alignItems: "center", justifyContent: "flex-end" }}>
        <Button variant="outlined" sx={{ mr: 1 }} onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton onClick={handleConfirm} loading={loading} variant="contained">
          Confirm
        </LoadingButton>
      </Box>
    </Paper>
  );
}
