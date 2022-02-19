import { Container, Typography } from "@mui/material";
import React from "react";

export default function Page2() {
  return (
    <>
      <Container maxWidth="md">
        <Typography
          sx={{
            mb: 4,
            alignItems: "left",
            color: "darkblue",
          }}
          component="h2"
          variant="h7"
        >
          Mode d'emploi
        </Typography>
        <Typography sx={{ fontWeight: "bold", mb: 1 }}>
        Vous avez un colis à envoyer?
        </Typography>
        <Typography sx={{ mb: 2 }}>
        Réservez une place ! Envoyer où vous voulez. D'où vous voulez.
Remplissez votre profil En remplissant votre profil, vous donnez aux potentiels transporteurs la possibilité de mieux vous connaître tout en consultant votre demande de réservation. Assurez-vous d'ajouter une photo de profil et de vérifier votre pièce d'identité - les transporteurs ont tendance à préférer un profil bien rempli ! 
Recherchez votre transporteur 

Pour trouver un transporteur, il vous suffit d'indiquer où vous envoyer votre colis, d'où et quand. Choisissez ensuite un transporteurs qui vous convient ! Si vous avez besoin de plus d'informations, vous pouvez contacter les transporteurs avant de réserver ou consulter leurs profils pour voir leurs avis. pensez à laisser un avis ! Si vous laissez un avis, vous aurez plus de chances d’en recevoir un à votre tour. Vous ne trouvez pas de transporteurs ? vous pouvez vous-meme publier une petite annonce en cliquant sur ce lien. vous serez  probablement contacter par un transporteur que accepter de transporter votre colis
        </Typography>
        <Typography sx={{ fontWeight: "bold", mb: 1 }}>
        Pour les transporteurs 
        </Typography>
        <Typography sx={{ mb: 2 }}>
        Remplissez votre profil 

En remplissant votre profil, vous donnez aux potentiels utilisateurs la possibilité de mieux vous connaître tout en consultant votre profil. Assurez-vous d'ajouter une photo de profil et de vérifier votre pièce d'identité - les utilisateurs ont tendance à préférer un profil bien rempli !

Réservez une place ! Économique et convivial : Proposez vos trajets sur LelBled et faites des économies en transportant des colis.

Publiez votre annonce (Cliquer ici) Indiquez simplement où vous allez, quand vous partez et où vous aimeriez récupérer et déposer les colis.  C'est plus pratique pour tout le monde !
        </Typography>
      </Container>
    </>
  );
}
