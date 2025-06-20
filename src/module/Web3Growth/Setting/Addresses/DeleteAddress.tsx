import DeleteIcon from "@mui/icons-material/Delete";
import ButtonWithWarning from "@centic-scoring/components/Dialogs/ButtonWithWarning";
import PermissionComponent from "@centic-scoring/components/PermissionComponent";
import useAsyncAction from "@centic-scoring/hooks/common/useAsyncAction";
import { Box } from "@mui/material";
import { deleteAddress } from "@centic-scoring/api/services/web3-growth/setting";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import { getAddressesSetting } from "@centic-scoring/redux/slices/setting/fetchFunctions";

export default function DeleteAddress({ address, chainId }: { address: string; chainId: string }) {
  const { id } = useURLQuery();
  const dispatch = useAppDispatch();
  const { action, loading } = useAsyncAction({
    actionFunc: async () => {
      await deleteAddress({ id, address, chainId });
    },
    onSuccess: () => dispatch(getAddressesSetting({ id })),
  });

  return (
    <PermissionComponent
      disableMode="hidden"
      permisionPath={["settings"]}
      requiredPermisison={["delete"]}
    >
      <Box sx={{ minWidth: "120px", backgroundColor: "background.primary" }}>
        <ButtonWithWarning
          onClick={action}
          warningText="Delete this Dapp?"
          disabled={loading}
          sx={{
            "&:hover": {
              backgroundColor: "text.active2",
              color: "text.primary",
            },
            width: "100%",
            borderRadius: 0,
            display: "flex",
            justifyContent: "flex-start",
            px: 2,
            backgroundColor: "background.hover",
            color: "text.active",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              py: 0.5,
            }}
          >
            <DeleteIcon fontSize="small" sx={{ mr: 0.5 }} /> Delete
          </Box>
        </ButtonWithWarning>
      </Box>
    </PermissionComponent>
  );
}
