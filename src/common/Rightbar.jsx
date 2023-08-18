import React from 'react'
import { Avatar, Box, Divider, ImageList, ImageListItem, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'

const Rightbar = () => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", md: "block"} }} >
      <Box position="fixed" width={300}>
    
        <Typography variant='h6' fontWeight={100} mt={2} mb={2}>
          Prikazi svoju najbolju taktiku
        </Typography>
        <ImageList cols={3} rowHeight={100} gap={5} sx={{mr: {md: 8, lg: 0}, overflow: 'hidden'}}>
 
          <ImageListItem>
            <img
              src="https://handballgoalkeeper.com/wp-content/uploads/2023/07/rukometni-camp-LOGO.png"
              alt="salestrekker"
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src="https://www.pngall.com/wp-content/uploads/11/Handball-PNG-HD-Image.png"
              alt="salestrekker"
            />
          </ImageListItem>
          <ImageListItem>
            <img
        
              src="https://www.pngall.com/wp-content/uploads/11/Handball-PNG.png"
              alt="salestrekker"
            />
          </ImageListItem>
        </ImageList>
        <Typography variant='h6' fontWeight={100} mt={2}>
          O Aplikaciji
        </Typography>
        <List sx={{ width: {md: '80%', lg: '100%'}, maxWidth: 300, bgcolor: 'background.paper'}}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="salestrekker" src="https://www.nssport.com/images/products/big/11728.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary=""
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                   
                  </Typography>
                  {" — U ovoj slobodnoj verziji koristite dijagram kako biste jasno predstavili svojim igračima složene koncepte taktike. Vizualni prikazi olakšavaju razumevanje i primenu strategija na terenu."}
                </React.Fragment>
              }
            />
          </ListItem>

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="salestrekker" src="https://contents.mediadecathlon.com/p1818019/k$80c4e1d2cf202771def6b2cdc492b86b/kids-size-1-handball-h100-soft-blueslashorange.jpg?format=auto&quality=40&f=800x800" />
            </ListItemAvatar>
            <ListItemText
              primary=""
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                   
                  </Typography>
                  {" — U Plaćenoj Verziji aplikacije, otvorena su vrata ka dubokom razumevanju taktičkih aspekata rukometne igre, koristeći izuzetno bogat niz vizualnih sredstava. Ova verzija predstavlja vrhunski alat za trenera i igrače koji žele da se posvete suštinskim detaljima svoje strategije i maksimalno unaprede performanse tima.Sada, na samo jedan klik, vaši igrači se postavljaju na terenu tačno na svoje pozicije.Nema više ručnog pomeranja igrača - sve se obavlja sa brzim i preciznim klikom miša. Oživite taktiku napada i odbrane uz pomoć autentičnih animacija. "}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Box>
    </Box>
  )
}

export default Rightbar