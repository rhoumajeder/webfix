import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Grid } from "@mui/material";

function index() {
  return (
    <>
      <Container maxWidth="md">
        <Grid sx={{ my: 10 }}>
          <Typography sx={{ fontWeight: "bold", my: 1 }}>
            People also ask
          </Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Which is correct FAQ or FAQs?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                It's FAQ, for certain: Frequently Asked Questions, a simple
                plural. With “FAQs”, you get an extra S… would that be called a
                double plural? Anyway, two s's have no Earthly reason to exist
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>What is FAQ full form?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>FAQ (Frequently Asked Questions)</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Is FAQ an apostrophe?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                FAQ is an acronym for Frequently Asked Questions. It's not
                possessive, not a contraction, doesn't have any foreign origins
                and is not used to indicate stress, so I write FAQs.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>What does FAQ stand for in computers?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                FAQ. abbreviation for. computing frequently asked question or
                questions: a text file containing basic information on a
                particular subject.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>What is FAQ section?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                In contrast to a landing page, where the goal is to convert
                buyers, the Frequently Asked Questions (FAQ) section is a part
                of your website where you address common concerns, questions,
                and objections that customers have
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>What is the plural of FAQ?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>The plural form of faq is faqs.</Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Container>
    </>
  );
}
export default index;
