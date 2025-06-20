import { Avatar, Box, Paper, Typography } from "@mui/material";
import Link from "next/link";

type Props = {
  img: string;
  project: string;
  projectName: string;
  mentions: number;
  url: string;
};

export default function CollaborationItem({ img, project, projectName, mentions, url }: Props) {
  return (
    <Link href={url} target="_blank" style={{ textDecoration: "none" }}>
      <Paper
        sx={{
          p: 2.5,
          backgroundColor: "background.paper2",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar
            src={img}
            alt="collaboration"
            style={{ width: 48, height: 48, borderRadius: 8, marginRight: 20 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Typography variant="h6">{projectName}</Typography>
            <Typography variant="body2" fontWeight={600} color="text.active">
              @{project}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ px: 2, py: 1.5, bgcolor: "background.default", borderRadius: "8px" }}>
          <Typography variant="h3" color="#5185AA">
            {mentions}{" "}
            <Typography component={"span"} variant="h5">{`${
              mentions > 1 ? "posts" : "post"
            }`}</Typography>
          </Typography>
        </Box>
      </Paper>
    </Link>
  );
}
