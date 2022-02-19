import React from "react";
import { Container } from "@mui/material";
import Header from "../../components/Header/Header";
import NewFooter from "../../components/NewFooter/NewFooter";
function index() {
  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <h1>Qui sommes-nous?</h1>
        <p>
        Lelbled est un réseau de transport fondé sur une très large communauté qui partagent des trajets en transportant des Colis. Lelbled met la technologie au service de l’humain en optimisant l’envoi de colis urgent et rend le voyage plus économique. Notre équipe du Service Client est disponible 24/7 pour toutes questions, conseils ou pour vous permettre de passer commande au téléphone.

Nous avons pleinement conscience de l'importance de vos délais. Satisfaction de nos utilisateurs est primordiale
        </p>
        <img
          src="https://softteco.com/media/Jan_Feb20/TeamStr.png"
          alt="AAAAAA"
          width="1000"
          height="400"
        />
      </Container>
      <NewFooter />
    </div>
  );
}

export default index;
