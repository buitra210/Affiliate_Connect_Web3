import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ContentTable from "./ContentTable";
import TopTweets from "./TweetsTopic/TopTweets";
import { TypeFilter } from "@centic-scoring/api/services/affiliate";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const MostDiscussedTopic = dynamic(() => import("./TweetsTopic/DiscussedTopic"), { ssr: false });
export default function KOLContent() {
  const [type, setType] = useState<TypeFilter>("Weekly");
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value as TypeFilter;
    setType(value);
  };
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary>
        <Typography variant="h6" color="text.secondary">
          Content
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ButtonGroup sx={{ mb: 2, display: "flex", justifyContent: "end" }}>
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
        <ContentTable type={type} />
        <Paper sx={{ backgroundColor: "background.hover", p: 2.5 }}>
          <Grid container>
            <Grid item xs={7}>
              <MostDiscussedTopic />
            </Grid>
            <Grid item xs={5}>
              <TopTweets type={type} />
            </Grid>
          </Grid>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
}
