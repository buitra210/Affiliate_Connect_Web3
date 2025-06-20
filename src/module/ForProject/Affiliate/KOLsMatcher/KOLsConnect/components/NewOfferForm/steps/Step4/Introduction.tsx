import TextEditor from "@centic-scoring/components/TextEditor";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { editForm } from "@centic-scoring/redux/slices/kol-offer";
import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Introduction() {
  const { offerForm } = useKOLOfferSelector();
  const [updateContent, setUpdateContent] = useState<string>(offerForm.description.text);
  const dispatch = useAppDispatch();

  const updateReduxState = useDebounce(() => {
    dispatch(
      editForm({
        description: {
          ...offerForm.description,
          text: updateContent,
        },
      })
    );
  }, 1000);

  useEffect(() => {
    updateReduxState();
  }, [updateContent, updateReduxState]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src={offerForm.description.logo} sx={{ width: "38px", height: "38px", mr: 2 }} />
        <Typography variant="h2" fontWeight={600}>
          {offerForm.description.title}
        </Typography>
      </Box>
      <Box
        sx={{
          "& .input-container": {
            minHeight: "10px",
          },
          "& .text-container": {
            pb: "24px",
          },
        }}
      >
        <TextEditor
          onValueChange={(e) => {
            setUpdateContent(e);
          }}
          initValue={offerForm.description.text}
          inputType="markdown"
        />
      </Box>
    </Box>
  );
}
