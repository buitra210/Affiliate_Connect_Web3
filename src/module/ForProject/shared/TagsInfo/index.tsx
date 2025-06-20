import { Box, Typography } from "@mui/material";
import TagsItem from "../TagsItem";
import { ReactNode } from "react";

type Props = {
  tags: string[];
  filterConfig: {
    tags?: boolean;
    walletBalance?: boolean;
    currentHolding?: boolean;
    walletAge?: boolean;
    transIn30Days?: boolean;
    protocols?: boolean;
    activeChain?: boolean;
  };
  title?: ReactNode;
};

export default function TagsInfo({ filterConfig, tags, title }: Props) {
  return (
    <>
      {tags?.length > 0 && filterConfig.tags && (
        <Box>
          {title || (
            <Typography variant="small" color="#9AA7BA">
              Tags
            </Typography>
          )}
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {tags.map((tag) => {
              return <TagsItem key={tag} tag={tag} />;
            })}
          </Box>
        </Box>
      )}
    </>
  );
}
