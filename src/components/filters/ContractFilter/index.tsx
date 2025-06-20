import { Autocomplete, Box, TextField } from "@mui/material";
import {
  useAppDispatch,
  useCommonDataSelector,
  useUserExploreSelector,
} from "@centic-scoring/redux/hook";
import { useEffect, useMemo } from "react";
import { getProjectContract } from "@centic-scoring/redux/slices/common/fetchFunction";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";

type Props = {
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (chain: string) => void;
  value: string;
};

export default function ContractFilter({ value, label, onChange }: Props) {
  const dispatch = useAppDispatch();
  const { contract } = useCommonDataSelector();
  const { filterOptions } = useUserExploreSelector();
  const { id } = useURLQuery();

  useEffect(() => {
    if (id) {
      dispatch(getProjectContract(id));
    }
  }, [dispatch, id]);

  const contractList = useMemo(() => {
    return (
      contract?.data
        ?.filter((i) => i.isContract)
        ?.filter((i) => {
          if (!filterOptions?.dapp) {
            return true;
          } else {
            return i?.dappId?.toLocaleLowerCase() === filterOptions?.dapp?.toLocaleLowerCase();
          }
        })
        ?.filter((i) => i.name)
        ?.map((i) => ({
          label: i?.name || "",
          value: i?.address || "",
        })) || []
    );
  }, [contract.data, filterOptions.dapp]);

  return (
    <Box sx={{ minWidth: "200px" }}>
      <Autocomplete
        loading={contract.status === "PROCESSING"}
        options={[{ label: "All Contract", value: "" }, ...contractList]}
        value={
          contractList?.find((i) => i.value === value) || {
            label: "All Contract",
            value: "",
          }
        }
        onChange={(_, newValue) => {
          onChange && onChange(newValue?.value || "");
        }}
        renderInput={(params) => {
          return (
            <TextField
              variant="outlined"
              color="primary"
              sx={{ fontWeight: 500 }}
              {...params}
              label={label || ""}
              fullWidth
            />
          );
        }}
      />
    </Box>
  );
}
