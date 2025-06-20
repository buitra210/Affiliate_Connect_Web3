import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { getKolCollaboration } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import { Box, Button, ButtonGroup, Grid, Paper, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import CollaborationItem from "./CollaborationItem";
import { TypeFilter } from "@centic-scoring/api/services/affiliate";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";

export default function MentionedProject() {
  const [type, setType] = useState<TypeFilter>("Weekly");
  const [page, setPage] = useState<number>(0);
  const { daily, weekly, monthly } = useKOLsSelector().kol.collaboration;
  const { id, kolUserName } = useURLQuery();
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value as TypeFilter;
    setType(value);
  };

  const handlePageChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const data = useMemo(() => {
    if (type === "Daily") {
      return daily;
    }
    if (type === "Weekly") {
      return weekly;
    }
    if (type === "Monthly") {
      return monthly;
    }
    return weekly;
  }, [type, daily, weekly, monthly]);

  useEffect(() => {
    if (!(data.data.status === "SUCCESS" && data.fetchedId === kolUserName) && id && kolUserName) {
      dispatch(getKolCollaboration({ id, userName: kolUserName, typeFilter: type }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.fetchedId, id, kolUserName]);

  return (
    <Box
      sx={{
        "& .loading-container": {
          minHeight: "225px",
        },
      }}
    >
      <Paper sx={{ px: 3, py: 3.5, backgroundColor: "background.hover" }}>
        <Box
          sx={{
            mb: 3.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            flexWrap: "wrap",
            rowGap: 2,
          }}
        >
          <Typography variant="body2" fontWeight={500}>
            Mentioned Projects
          </Typography>
          <ButtonGroup>
            <Button
              value="Daily"
              onClick={handleClick}
              variant={type === "Daily" ? "contained" : "outlined"}
              color={"primary"}
            >
              Daily
            </Button>
            <Button
              value="Weekly"
              onClick={handleClick}
              variant={type === "Weekly" ? "contained" : "outlined"}
              color={"primary"}
            >
              Weekly
            </Button>

            <Button
              value="Monthly"
              onClick={handleClick}
              variant={type === "Monthly" ? "contained" : "outlined"}
              color={"primary"}
            >
              Monthly
            </Button>
          </ButtonGroup>
        </Box>
        <ComponentWithStatus status={data.data.status} noData={data.data.data?.length == 0}>
          <Grid container spacing={2}>
            {data.data.data && (
              <>
                {data.data.data.slice(page * 12, (page + 1) * 12).map((item, index) => {
                  return (
                    <Grid item xs={12} sm={6} key={index + page * 12}>
                      <CollaborationItem
                        img={item.profileImageUrl}
                        mentions={item.numberOfMentions}
                        project={item.twitterUserName}
                        projectName={item.projectName}
                        url={item.url}
                      />
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
          {data.data.data && data.data.data.length > 12 && (
            <TablePagination
              component="div"
              count={data.data.data?.length || 0}
              onPageChange={handlePageChange}
              page={page}
              rowsPerPage={12}
              rowsPerPageOptions={[12]}
            />
          )}
        </ComponentWithStatus>
      </Paper>
    </Box>
  );
}
