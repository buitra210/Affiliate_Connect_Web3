import TextEditor from "@centic-scoring/components/TextEditor";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { editForm } from "@centic-scoring/redux/slices/kol-offer";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  editable?: boolean;
};
export default function ContractInfo({ editable }: Props) {
  const { offerForm } = useKOLOfferSelector();
  const [text, setText] = useState<string>(offerForm.contactInformation);
  const dispatch = useAppDispatch();
  const debounceUpdate = useDebounce(() => {
    dispatch(
      editForm({
        contactInformation: text,
      })
    );
  }, 500);

  useEffect(() => {
    debounceUpdate();
  }, [text, debounceUpdate]);

  return (
    <Box>
      <TextEditor
        onValueChange={(e) => {
          setText(e);
        }}
        initValue={offerForm.contactInformation}
        inputType="markdown"
        placeholder={""}
        viewMode={!editable}
      />
    </Box>
  );
}
