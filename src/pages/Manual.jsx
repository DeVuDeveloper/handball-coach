import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,

  IconButton,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Manual = () => {
  const [showWireframe, setShowWireframe] = useState(true);

  const toggleWireframe = () => {
    setShowWireframe(!showWireframe);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.default"
    >
      <Card sx={{ width: 400 }}>
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
     
        <CardContent>
          <Typography variant="h5" fontWeight={200} color="text.secondary">
            Korisničko Uputstvo
          </Typography>
  
          <Typography variant="body2" color="text.secondary" mt={2}>
            1. Generišite igrače odbrane i napada.
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2}>
            2. Kliknite na dugme "Prikaži Wireframe" da biste koristili
            wireframe kao pomoć pri postavljanju igrača na realnoj poziciji na
            terenu.
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2}>
            3. Koristite strelice da biste prikazali svoju taktiku.
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2}>
            4. Za kretanje igrača koristite levu tipku miša i povlačenje po terenu, dok se rotacija igrača za napad ostvaruje putem desnog klika miša i strelica za željeni smer.
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2}>
            4. Nakon postavljanja taktike, možete skloniti wireframe klikom na
            dugme "Sakrij Wireframe".
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2}>
            Uživajte u analiziranju i planiranju svoje igre!
          </Typography>
        </CardContent>
        <IconButton
          onClick={toggleWireframe}
          sx={{ ml: "auto" }}
          color="primary"
        >
          {showWireframe ? <ArrowForwardIcon /> : <ArrowForwardIcon />}
        </IconButton>
      </Card>
    </Box>
  );
};

export default Manual;

