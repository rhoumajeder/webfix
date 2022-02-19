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
                        Question/Réponse
                    </Typography>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography>
                            Je chercher un transporteur, mais je n’ai pas trouvé comment faire ?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            Essayer de chercher dans une departement voisine ou reculer la date de voyage, il rester possible de créer une annonce en vous proposant votre colis. certains transporteurs prefere contacter directement l’utilisateur qui met plus de détails sur son colis.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography>Comment trouver un bon transporteur?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            il est important de consulter les avis et le profil de transporteurs. Nous  vérifions également les avis, les profils et les pièces d’identité. il est possible aussi de contacter le transporteurs par message ou en téléphone
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
                            Comment Contacter Lelbled? 
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            il exister plusieurs moeyn de communication: Vous pouver nous contacter sur whatsApp ou consulter notre page FaceBook Lelbled, il est possible aussi de nous envoyer un message en cliquant sur ce lien.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography>Est-ce que je peux envoyer tout ce que veux avec le transporteur?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            Le transporteur peut accepter ou refuser de transporter certains colis pour différent raison. 
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Est-il possible de payer en ligne ?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            Actuellement , il est possible de payer uniquement en cash. Service de paiment en ligne est en cours.
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
