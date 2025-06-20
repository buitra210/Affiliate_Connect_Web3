import { addToFavorite, removeFavorite } from "@centic-scoring/api/services/affiliate";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { StartContained, StartOutlined } from "@centic-scoring/icons";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  favorite: boolean;
  userName: string;
};
export default function KOLFavorite({ favorite, userName }: Props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);
  const { id } = useURLQuery();
  const handleClick = async () => {
    if (!isFavorite) {
      try {
        setIsFavorite(true);
        await addToFavorite({ id: id, userName });
      } catch (error) {
        toast((error as Error).message);
        setIsFavorite(false);
      }
    } else {
      try {
        setIsFavorite(false);
        await removeFavorite({ id: id, userName });
      } catch (error) {
        toast((error as Error).message);
        setIsFavorite(true);
      }
    }
  };
  return (
    <Box>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
        sx={{ my: 0.5 }}
      >
        {isFavorite && <StartContained />}
        {!isFavorite && <StartOutlined />}
      </IconButton>
    </Box>
  );
}
