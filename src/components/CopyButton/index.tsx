import { CopiedIcon, CopyIcon } from "@centic-scoring/icons";
import { IconButton } from "@mui/material";
import { MouseEventHandler, useState } from "react";

export default function CopyButton({
  onClick,
  text,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  text: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick;
        setCopied(true);
        navigator.clipboard.writeText(text);
      }}
    >
      {copied ? <CopiedIcon color="info" /> : <CopyIcon color="info" />}
    </IconButton>
  );
}
