import React from 'react';
import {
    Box, CardActions, CardContent, Button, Typography
} from "@mui/material";
import fash from "../../assets/images/flash.png";
import img from '../../assets/images/database.png';
import './NewFeedback.css';
import { Card, Container } from '@material-ui/core';
import { FaBolt,FaCoins,FaIdCard,FaGrinWink  } from "react-icons/fa";

function NewFeedback() {
    return (
        <div>
            <Container>
                <Card className="px-2 py-5 shadow mb-5">
                    <div className="row">
                        <div className="col-md-6 p-3">
                            <Card className='cardShadow border border-2 p-2 mr-1 ml-1' sx={{ textAlign: 'justify' }}>
                                <CardContent>
                                    {/* <img src={fash} alt="not found" width='25px' height='25px' /> */}
                                    <FaCoins size="35px" /> 
                                    <Typography variant="h5" component="div" style={{ fontWeight: 600 }}> 
                                    Economiser vos billets
                                    </Typography>
                                    <Typography variant="body2">
                                    Proposez vos trajets sur LelBled et faites des économies en transportant des colis. Vos Billets(Avion/Bateau) vous coûtent chers? Découvrez LelBled App, notre application vous aide à trouver l’annonce idéal pour transporter des (colis/Accessoires/Documents) selon votre tarif.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-6 p-3">
                            <Card className='cardShadow border border-2 p-2 mr-1 ml-1' sx={{ textAlign: 'justify' }} >
                            <CardContent>
                                    {/* <img src={fash} alt="not found" width='25px' height='25px' /> */}
                                    <FaBolt size="35px" /> 
                                    <Typography variant="h5" component="div" style={{ fontWeight: 600 }} > 
                                        Envoyer Vos Bien le plus vite possible
                                    </Typography>
                                    <Typography variant="body2">
                                    Vous Avez un colis ou un document urgent à envoyer ? Découvrez LelBled App, Notre service vous aide à trouver la personne idéale avec qui vous envoyer votre colis. Où que vous envoyer vos colis, trouvez l’annonce idéal parmi notre large choix de destinations à petits prix.
                                    </Typography>
                                </CardContent>
                            
                            </Card>
                        </div>
                        <div className="col-md-6 p-3">
                            <Card className='cardShadow border border-2 p-2 mr-1 ml-1' sx={{ textAlign: 'justify' }}>
                            <CardContent>
                                    {/* <img src={img} alt="not found" width='25px' height='25px' />  */}
                                    <FaIdCard size="35px" /> 
                                    <Typography variant="h5" component="div" style={{ fontWeight: 600 }} >
                                         Envoyer en toute confiance
                                    </Typography>
                                    <Typography variant="body2">
                                    Nous prenons le temps qu’il faut pour connaître nos membres.&nbsp; Nous vérifions les avis, les profils et les pièces d’identité.&nbsp; Vous savez donc avec qui vous envoyer vos colis pour réserver en toute confiance sur notre plateforme sécurisée.

                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-6 p-3">
                            <Card className='cardShadow border border-2 p-2 mr-1 ml-1' sx={{ textAlign: 'justify' }}>
                                <CardContent>
                                    {/* <img src={fash} alt="not found" width='25px' height='25px' /> */}
                                    <FaGrinWink size="35px" />
                                    <Typography variant="h5" component="div" style={{ fontWeight: 600 }}> 
                                        Recherchez et réservez 
                                    </Typography>
                                    <Typography variant="body2">
                                        Trouver un transporteur devient encore plus simple !&nbsp; 
                                        Facile d'utilisation et dotée de technologies avancées, notre appli vous permet de réserver en un rien de temps.&nbsp;


                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default NewFeedback;
