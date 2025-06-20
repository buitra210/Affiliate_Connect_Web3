import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const AudienceOverTime = dynamic(() => import("./AudienceoverTime"), { ssr: false });

export default function KOLOverview() {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary>
        <Typography variant="h6" color="text.secondary">
          Overview
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AudienceOverTime />
      </AccordionDetails>
    </Accordion>
  );
}
