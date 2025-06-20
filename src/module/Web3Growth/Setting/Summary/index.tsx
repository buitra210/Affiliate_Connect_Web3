import CopyButton from "@centic-scoring/components/CopyButton";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch, useProjectSummarySelector } from "@centic-scoring/redux/hook";
import { getProjectSummary } from "@centic-scoring/redux/slices/common/fetchFunction";
import { Avatar, Box, Button, Grid, Paper, SxProps, Typography } from "@mui/material";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";

const row: SxProps = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  py: 3,
  borderBottom: "1px solid #344456",
};
const label: SxProps = {
  width: "120px",
  minWidth: "120px",
};
export default function Summary() {
  const router = useRouter();
  const { id } = useURLQuery();
  const { data } = useProjectSummarySelector();
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    router.push(`/projects/setting/${id}/edit`);
  };

  useEffect(() => {
    if (id) {
      dispatch(getProjectSummary(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);
  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h6"
            fontWeight={700}
            color="text.secondary"
            mb={4}
            order={{ xs: 2, sm: 1 }}
          >
            Overview Information
          </Typography>
          <Box
            sx={{
              "& .MuiBox-root:last-child": {
                borderBottom: "none",
              },
            }}
          >
            <Box sx={row}>
              <Typography sx={label} variant="body1" color="text.secondary">
                Name
              </Typography>
              <Typography>{data?.name}</Typography>
            </Box>
            <Box sx={row}>
              <Typography sx={label} variant="body1" color="text.secondary">
                Project ID
              </Typography>
              <Typography sx={{ mr: 1 }}>{data?.id}</Typography>
              {data && (
                <Box sx={{ mt: -1.5 }}>
                  <CopyButton text={data.id} />
                </Box>
              )}
            </Box>
            <Box sx={row}>
              <Typography sx={label} variant="body1" color="text.secondary">
                Description
              </Typography>
              <Typography>{data?.description}</Typography>
            </Box>
            <Box sx={row}>
              <Typography sx={label} variant="body1" color="text.secondary">
                Category
              </Typography>
              <Typography>{data?.category}</Typography>
            </Box>
            <Box sx={row}>
              <Typography sx={label} variant="body1" color="text.secondary">
                Visible type
              </Typography>
              <Typography
                fontWeight={500}
                color={data?.visible === "public" ? "text.active" : "text.active3"}
              >
                {capitalize(data?.visible)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} order={{ xs: 2, sm: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box sx={{ border: "1px solid #5185AA", p: "3px", borderRadius: "50%", mb: 5 }}>
              <Avatar src={data?.imgUrl || "#"} sx={{ width: "140px", height: "140px" }} />
            </Box>
            <Button variant="contained" color="info" onClick={handleEdit}>
              Edit Project
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
