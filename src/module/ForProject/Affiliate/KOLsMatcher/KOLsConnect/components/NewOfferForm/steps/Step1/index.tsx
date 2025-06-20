import TextEditor from "@centic-scoring/components/TextEditor";
import { UploadIcon } from "@centic-scoring/icons";
import { Box, Grid, keyframes, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { editForm } from "@centic-scoring/redux/slices/kol-offer";
import { postFiles } from "@centic-scoring/api/services/web3-growth/campaign";

const fowardAnimation = keyframes(`
  from {
    transform: translateY(4px);
  }
  to {
    transform: translateY(-4px);
  }`);

export default function Step1() {
  const { offerForm } = useKOLOfferSelector();
  const [name, setName] = useState<string>(offerForm.name);
  const [link, setLink] = useState<string>(offerForm?.featuredLink);
  const [linkErrortext, setLinkErrorText] = useState<string>("");
  // const expression = /^https?:\/\/[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,6}([a-zA-Z0-9()@:%_+.~#?&//=]*)?$/;
  const expression = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9()@:%_+.~#?&/=!-]*)?$/;

  const regex = new RegExp(expression);
  const [title, setTitle] = useState<string>(offerForm.description?.title);
  const [contentText, setContentText] = useState<string>(offerForm.description?.text);
  // const [avatar, setAvatar] = useState<FileList>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>(offerForm.description?.logo || "");
  const initContent = useMemo(() => {
    return offerForm.description?.text;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceCheckLink = useDebounce(() => {
    if (link) {
      if (link.match(regex)) {
        setLinkErrorText("");
      } else {
        setLinkErrorText("Invalid Link");
      }
    }
  }, 200);

  useEffect(() => {
    debounceCheckLink();
  }, [debounceCheckLink, link]);

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const onAvatarClick = () => {
    inputRef?.current?.click();
  };

  const updateReduxState = useDebounce(() => {
    if (!linkErrortext) {
      dispatch(
        editForm({
          name: name,
          featuredLink: link,
          description: {
            text: contentText,
            title,
            logo: fileUrl,
          },
        })
      );
    } else {
      dispatch(
        editForm({
          name: name,
          featuredLink: "",
          description: {
            text: contentText,
            title,
            logo: fileUrl,
          },
        })
      );
    }
  }, 1000);

  useEffect(() => {
    updateReduxState();
  }, [name, link, contentText, title, fileUrl, updateReduxState, linkErrortext]);

  return (
    <Paper sx={{ p: 3.5 }}>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" color="text.label1" mb={1}>
            Offer&#39;s name *
          </Typography>
          <TextField
            placeholder="Enter offer&#39;s name here..."
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" color="text.label1" mb={1}>
            Promotional Link *
          </Typography>
          <TextField
            error={!!linkErrortext}
            helperText={linkErrortext || " "}
            fullWidth
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter the URL for Influencers to promote"
            sx={{ mb: -4 }}
          />
        </Grid>
      </Grid>
      <Box>
        <Typography variant="body1" color="text.label1">
          Description
        </Typography>
        <Paper sx={{ backgroundColor: "background.default", mt: 1, px: 1, pb: 3 }}>
          <Box sx={{ px: 2, py: 3 }}>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" color="text.label1" mb={1}>
                  Feature title *
                </Typography>
                <TextField
                  placeholder="Enter the title of new feature to be promoted"
                  fullWidth
                  sx={{ border: "1px solid #5185AA" }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" color="text.label1" mb={1}>
                  Feature logo *
                </Typography>
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "text.active2",
                    borderRadius: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "58px",
                    px: 2,
                    cursor: "pointer",
                  }}
                  onClick={onAvatarClick}
                >
                  <Typography variant="body1" color={"text.label1"} noWrap>
                    {fileUrl?.split("/")?.pop()}
                  </Typography>
                  <UploadIcon
                    sx={{
                      fontSize: "40px",
                      "& .upload-arrow": {
                        animation: loading ? `${fowardAnimation} 1s linear infinite` : "none",
                      },
                    }}
                  />
                </Box>
                <input
                  type="file"
                  multiple={false}
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={inputRef}
                  onChange={async (e) => {
                    setLoading(true);
                    try {
                      if (e.target.files) {
                        const res = await postFiles(e.target.files);
                        setFileUrl(String(res?.urls![0]));
                        // setAvatar(e.target.files || undefined);
                      }
                    } catch (error) {
                      //pass
                    }
                    setLoading(false);
                  }}
                />
              </Grid>
            </Grid>
            <TextEditor
              outputType="markdown"
              inputType="markdown"
              initValue={contentText}
              onValueChange={(v) => {
                setContentText(v);
              }}
              updateValue={initContent}
              placeholder="Enter your feature's description *"
            />
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
}
