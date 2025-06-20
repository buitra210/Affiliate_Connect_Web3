import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { AddIcon } from "@centic-scoring/icons";
import { TAudienceFilter } from "@centic-scoring/redux/slices/audience-advanced-filter";
import { Button, Dialog, Paper } from "@mui/material";
import SegmentContextProvider from "../../audience/Segmentation/components/CreateNewSegment/context/SegmentContext";
import { CreateSegmentStep2 } from "../../audience/Segmentation/components/CreateNewSegment/components/ContentForm";
import { useRouter } from "next/router";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
type Props = {
  data: {
    tags?: string[];
    walletBalance?: TAudienceFilter["walletBalance"];
    currentHolding?: TAudienceFilter["currentHolding"];
    walletAge?: TAudienceFilter["walletAge"];
    transIn30Days?: TAudienceFilter["transIn30Days"];
    protocols?: TAudienceFilter["protocols"];
    activeChain?: TAudienceFilter["activeChain"];
    filterConfig?: TAudienceFilter["filterConfig"];
    name?: string;
  };
};
export default function QuickCreate({ data }: Props) {
  const { handleClose, handleOpen, open } = useDialogState();
  const router = useRouter();
  const { id } = useURLQuery();
  return (
    <>
      {Object.keys(data || {}).length > 0 && (
        <Button
          disabled={Object.keys(data || {}).length === 0}
          variant="outlined"
          color="info"
          onClick={handleOpen}
        >
          <AddIcon sx={{ mr: 0.5, fontSize: "1.25rem" }} />
          Create Segment
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <SegmentContextProvider
          initData={{
            ...(data || {}),
            step: 2,
            filterConfig: {
              activeChain: Boolean(data.activeChain),
              currentHolding: Boolean(data.currentHolding),
              protocols: Boolean(data.protocols),
              tags: Boolean(data.tags),
              transIn30Days: Boolean(data.transIn30Days),
              walletAge: Boolean(data.walletAge),
              walletBalance: Boolean(Object.keys(data.walletBalance || {}).length),
            },
          }}
        >
          <Paper sx={{ minWidth: "400px", p: 3 }}>
            <CreateSegmentStep2
              onClose={handleClose}
              onSuccess={() => {
                if (id) {
                  router.push(`/projects/audiences/${id}/segmentation`);
                }
              }}
            />
          </Paper>
        </SegmentContextProvider>
      </Dialog>
    </>
  );
}
