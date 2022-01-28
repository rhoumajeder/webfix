import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Container, Grid, Accordion,
    AccordionDetails, AccordionSummary, Typography
} from "@mui/material";
import Header from '../Header/Header';
import NewFooter from '../NewFooter/NewFooter';


function FaqAccordation() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }
    return (
        <div>
            <Header />
            <Container maxWidth='md'>
                <Grid sx={{ my: 10 }}>
                    <Typography sx={{ fontWeight: "bold", my: 1 }}>
                        People also ask
                    </Typography>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography>
                                Which is correct FAQ or FAQs?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                It's FAQ, for certain: Frequently Asked Questions, a simple
                                plural. With “FAQs”, you get an extra S… would that be called a
                                double plural? Anyway, two s's have no Earthly reason to exist
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography>What is FAQ full form?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                FAQ (Frequently Asked Questions)
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography>
                                Is FAQ an apostrophe?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                FAQ is an acronym for Frequently Asked Questions. It's not
                                possessive, not a contraction, doesn't have any foreign origins
                                and is not used to indicate stress, so I write FAQs.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
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
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>What is FAQ section?</Typography>
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
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography>What is the plural of FAQ?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                The plural form of faq is faqs.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Container>
            <NewFooter />
        </div>
    )
}

export default FaqAccordation
