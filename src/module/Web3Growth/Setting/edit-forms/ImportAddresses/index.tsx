import { Box, Button, Dialog, MenuItem, Paper, TextField, Typography } from "@mui/material";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import Preview from "./Preview";
import { useEffect, useRef, useState } from "react";
import PreviewData from "./PreviewData";
import { parse } from "papaparse";
import FileExtentionIcon, { FileExtentions } from "@centic-scoring/components/FileExtentionIcon";
import { toast } from "react-toastify";
import { postFiles } from "@centic-scoring/api/services/web3-growth/campaign";
import { importAddress } from "@centic-scoring/api/services/web3-growth/setting";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import useAsyncAction from "@centic-scoring/hooks/common/useAsyncAction";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import { getAddressesSetting } from "@centic-scoring/redux/slices/setting/fetchFunctions";
import { LoadingButton } from "@mui/lab";
import { DownloadIcon } from "@centic-scoring/icons";

export default function ImportAddresses() {
  const { handleClose, handleOpen, open } = useDialogState();
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxWidth: "800px",
            backgroundColor: "background.paper",
            width: "100%",
          },
          className: "hide-scrollbar",
        }}
      >
        <Content handleClose={handleClose} />
      </Dialog>
      <Button variant="outlined" onClick={handleOpen}>
        <DownloadIcon fontSize="small" sx={{ mr: 0.5 }} /> Import File
      </Button>
    </Box>
  );
}

const FILE_TYPES: { label: string; value: string; extention: FileExtentions }[] = [
  {
    label: "CSV",
    value:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    extention: "csv",
  },
];

const Content = ({ handleClose }: { handleClose: () => void }) => {
  const { id } = useURLQuery();
  const dispatch = useAppDispatch();
  const { action, loading } = useAsyncAction({
    actionFunc: async () => {
      const fileUrls = await postFiles(file);
      await importAddress({ id, fileUrl: fileUrls?.urls![0] || "" });
    },
    successText: "Import address successfully!",
    onSuccess: () => {
      dispatch(getAddressesSetting({ id }));
    },
  });
  const handleClick = async () => {
    if (!file) {
      toast.error("Please upload a file");
      return;
    }
    await action();
  };
  const [file, setFile] = useState<FileList>();
  const [accept, setAccept] = useState<string>(
    ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
  );
  const [renderData, setRenderData] = useState<{
    header: string[];
    data: string[][];
  }>();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOpenFile = () => {
    inputRef?.current?.click();
  };

  useEffect(() => {
    if (file) {
      parse<string[]>(file[0], {
        complete: function (data) {
          setRenderData({ data: data.data?.slice(1, 5), header: data.data![0] });
        },
        skipEmptyLines: true,
      });
    }
  }, [file]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" color="text.secondary" mb={3}>
        Import addresses from file
      </Typography>
      <Typography variant="body2" color={"text.secondary"} mb={0.5}>
        File type
      </Typography>
      <TextField fullWidth select onChange={(e) => setAccept(e.target.value)} value={accept}>
        {FILE_TYPES.map((i, index) => {
          return (
            <MenuItem key={index} value={i.value}>
              {i.label}
            </MenuItem>
          );
        })}
      </TextField>
      <Box
        sx={{ mt: 3, borderRadius: 3, overflow: "hidden", boxShadow: "0px 0px 8px 0px #00000080" }}
      >
        <Preview />
      </Box>
      <Box mt={6} sx={{ display: "flex", justifyContent: "flex-start", textWrap: "wrap" }}>
        <Button
          variant="outlined"
          color="info"
          onClick={handleOpenFile}
          disabled={!accept}
          sx={{ mr: 6 }}
        >
          <DownloadIcon fontSize="small" sx={{ mr: 0.5 }} /> Select File
        </Button>
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          accept={accept}
          onChange={(e) => {
            setFile(e.target.files || undefined);
          }}
        />
        {file && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FileExtentionIcon extention={FILE_TYPES.find((i) => i.value === accept)?.extention} />
            <Typography variant="body2" color="text.secondary" ml={1}>
              {file![0]?.name}
            </Typography>
          </Box>
        )}
      </Box>
      {renderData && (
        <Box sx={{ mt: 3 }}>
          <PreviewData data={renderData} />
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mt: 3 }}>
        <Button variant="outlined" color="info" sx={{ mr: 1 }} onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton loading={loading} onClick={handleClick} variant="contained">
          Confirm
        </LoadingButton>
      </Box>
    </Paper>
  );
};
