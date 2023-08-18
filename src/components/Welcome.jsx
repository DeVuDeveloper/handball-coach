import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

const Welcome = () => {
  return (
    <Card sx={{ margin: 6 }}>
      <CardHeader
        avatar={
          <Avatar
            alt="D"
            src="../assets/me.png"
          />
        }
        title="Dejan"
        subheader="August 17, 2023, MIT licence"
      />
      <CardMedia
        component="img"
        className="h-80 md:h-96 lg:h-96"
        image="https://storage.googleapis.com/pod_public/1300/128706.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant='h5' fontWeight={200} color="text.secondary">
          Dobrodošli u Aplikaciju za Taktiku u Rukometu
        </Typography>
        <Typography variant='h7' fontWeight={100} color="text.secondary">
          Aplikacija je posvećena pružanju stručnih taktičkih smernica i vizualizacija za napadačke i odbrambene aspekte igre rukometa.
          Ovo je vaš ključni resurs za podizanje nivoa vaše ekipe na terenu,
          obezbeđujući temeljne strategije i dublje uvide kako biste postigli izvanredne rezultate.
          Ova aplikacija pruža sveobuhvatan pristup različitim napadnim formacijama, varijacijama prolaza i brzim kontrama. Pregledajte i analizirajte strategije koje će vam omogućiti da prevaziđete protivničke odbrane i postignete golove sa većom konzistencijom.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Welcome;