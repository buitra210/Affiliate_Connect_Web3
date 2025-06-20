import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import EngagementAnalysis from "./EngagementAnalysis";
import dynamic from "next/dynamic";
const TweetTimeAnalysis = dynamic(() => import("./TweetTimeAnalysis"), { ssr: false });

const TweetFrequencyAnalysis = dynamic(() => import("./TweetFrequencyAnalysis"), { ssr: false });
export default function KOLEngagement() {
  return (
    <Paper>
      <Accordion defaultExpanded={true}>
        <AccordionSummary>
          <Typography variant="h6" color="text.secondary">
            KOL Engagement
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <EngagementAnalysis />
              </Grid>
              <Grid item xs={12} md={6}>
                <TweetFrequencyAnalysis />
              </Grid>
              <Grid item xs={12} md={6}>
                <TweetTimeAnalysis />
              </Grid>
            </Grid>
          </AccordionDetails>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}
