import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { TAudiencesFilter } from "@centic-scoring/api/services/web3-growth/engagement";
import { exportSegment } from "@centic-scoring/api/services/for-project/audience/segmentation";
import { toast } from "react-toastify";
import { DownloadIcon2 } from "@centic-scoring/icons";

export default function ExportSegment({ input }: { input: TAudiencesFilter }) {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    // eslint-disable-next-line no-unused-vars
    const { id, ...dataInput } = { ...input };
    try {
      const res = await exportSegment({
        id: input.id,
        input: dataInput,
      });
      if (res) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(res);
        link.download = "audience.csv";
        link.click();
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };
  return (
    <LoadingButton onClick={handleClick} loading={loading} variant="outlined" color="info">
      <DownloadIcon2 sx={{ mr: 1, fontSize: "1.4rem" }} /> Export Data
    </LoadingButton>
  );
}
