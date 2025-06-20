import { Typography } from "@mui/material";
import Link from "next/link";

type Props = {
  url?: string;
  newPage?: boolean;
  title: string;
};

export default function Navigation({ title, newPage, url }: Props) {
  return (
    <Link
      href={url || "#"}
      style={{ textDecoration: "none" }}
      onClick={(e) => {
        if (!url) {
          e.preventDefault();
        }
      }}
      target={newPage ? "_blank" : "_self"}
    >
      <Typography
        variant="body1"
        color="text.primary"
        fontWeight={600}
        sx={{
          height: "38px",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderRadius: 2,
          transition: "all 0.1s linear",
          "&:hover": {
            color: "text.active2",
            backgroundColor: "background.paper",
          },
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>
    </Link>
  );
}
