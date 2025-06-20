import { postFiles } from "@centic-scoring/api/services/web3-growth/campaign";
import { Box, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

export default function TestPage() {
  const [image, setImage] = useState("");
  const [data, setData] = useState("");
  const [custom, setCustom] = useState("");
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileUrl = await postFiles(e.target.files);
      setImage(fileUrl?.urls[0] || "");
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      let customData = {};
      try {
        customData = JSON.parse(custom);
      } catch (error) {
        //pass
      }
      if (image) {
        setData(
          `${window.location.origin}/sharing?data=${window.btoa(
            JSON.stringify({
              thumbnail: image,
              ...customData,
            })
          )}`
        );
      }
    }
  }, [image, custom]);
  return (
    <Box>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <TextField
        fullWidth
        multiline
        rows={5}
        placeholder="Enter custom data here"
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
      />
      {data && (
        <a
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            "Check out Centic Platform"
          )}&url=${encodeURIComponent(data)}`}
          target="_blank"
          data-size="large"
          data-text="custom share text"
          data-url="https://dev.twitter.com/web/tweet-button"
          data-hashtags="example,demo"
          data-via="twitterdev"
          data-related="twitterapi,twitter"
        >
          Test
        </a>
      )}
    </Box>
  );
}
