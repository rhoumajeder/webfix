import { Container, Typography } from "@mui/material";
import React from "react";

export default function Page3() {
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
          Mode d'emploi (PAGE 3)
        </Typography>
        <Typography sx={{ fontWeight: "bold", mb: 1 }}>
          Pour Commencer
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
        <Typography sx={{ fontWeight: "bold", mb: 1 }}>
          Pour Commencer
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
        <Typography sx={{ fontWeight: "bold", mb: 1 }}>
          Pour Commencer
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </Container>
    </>
  );
}
