import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import MentionedProject from "./MentionedProject";

export default function KOLCollaboration() {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary>
        <Typography variant="h6" color="text.secondary">
          Collaboration
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MentionedProject />
      </AccordionDetails>
    </Accordion>
  );
}
