import { SvgIconProps, Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {
  url: string;
  Icon: React.FC<SvgIconProps>;
  name?: string;
};
export default function SocialIcon({ url, Icon, name }: Props) {
  return (
    <Tooltip title={`Centic ${name}`}>
      <Link href={url} target="_blank" style={{ marginRight: "10px" }}>
        <Icon
          sx={{
            ":hover": {
              "& path": {
                fill: "#5185AA",
              },
            },
          }}
        />
      </Link>
    </Tooltip>
  );
}
