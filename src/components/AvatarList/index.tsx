import { Avatar, Box, Link, Tooltip } from "@mui/material";
import { toast } from "react-toastify";

export type Props = {
  data: {
    name: string;
    avatar: string;
    link?: string;
    type: "link" | "text";
  }[];
  spacing?: number;
};

export default function AvatarList({ data, spacing }: Props) {
  const handleCopy = (text: string) => {
    try {
      navigator.clipboard.writeText(text).then(() => {
        toast.success("Copied to clipboard", { position: "top-right" });
      });
    } catch (error) {
      //pass
    }
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {data?.map((item, index) => {
        return (
          <Tooltip key={index} title={item.name || "#"} placement="top">
            <>
              {item.type === "link" && (
                <Link href={item.link || "#"} target={item.link ? "_blank" : "_self"}>
                  <Avatar
                    src={item.avatar || "#"}
                    sx={{
                      width: "24px",
                      height: "24px",
                      zIndex: 20 - index,
                      transform: `translateX(-${5 * index + -index * (spacing || 0)}px)`,
                      "&:hover": {
                        zIndex: 101,
                        width: "30px",
                        height: "30px",
                      },
                      transition: "all 0.1s ease-in-out",
                    }}
                  />
                </Link>
              )}
              {item.type === "text" && (
                <Avatar
                  src={item.avatar || "#"}
                  onClick={() => {
                    handleCopy(item.link || "");
                  }}
                  sx={{
                    width: "24px",
                    height: "24px",
                    zIndex: 20 - index,
                    transform: `translateX(-${5 * index + -index * (spacing || 0)}px)`,
                    "&:hover": {
                      zIndex: 101,
                      width: "30px",
                      height: "30px",
                    },
                    transition: "all 0.1s ease-in-out",
                    cursor: "pointer",
                  }}
                />
              )}
            </>
          </Tooltip>
        );
      })}
    </Box>
  );
}
