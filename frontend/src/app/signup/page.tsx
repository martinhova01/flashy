"use client"
import { Typography, Container, TextField, Grid, Box, Button } from "@mui/material";
import { useState } from "react";
import { ProfileDto } from "../utils/dto/ProfileDto";
import { requests } from "../utils/api/requests";
import DarkmodeSwitch from "../components/DarkmodeSwitch";

export default function SignUpPage() {

  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [school, setSchool] = useState<String>("");
  const [password, setPassword] = useState<String>("");



  async function handleAddUser() {
    let profile: ProfileDto = {
      profileId: 0,
      firstname: firstName,
      lastname: lastName,
      email: email,
      school: school,
      password: password,
      ownedDecks: [],
      admin: false
    }

    let added: Boolean = await requests.addNewProfile(profile);
    if (added) {
      window.location.href = "/";
    } else {
      alert("email is already taken!")
    }

  }

  function handleBack() {
    window.location.href = "/";
  }
  
    
    return <div>
        
        <Container>

        <Typography sx={{ fontFamily: "Italic", fontSize: 80, textAlign: "center", paddingTop: "10px" }}>
        Opprett bruker
      </Typography>
      
      <Typography sx={{ fontFamily: "Monospace", fontSize: 28, textAlign: "center", paddingTop: "10px" }}>
        Fyll inn informasjon
      </Typography>

      <Grid container direction={"column"} alignContent={"center"}>
        
        <TextField placeholder="Fornavn" onChange={(e) => {setFirstName(e.target.value)}} sx={{ fontFamily: "Monospace", paddingTop: "15px", textAlign: "center"}}>
        
        </TextField>
       
        <TextField placeholder="Etternavn" onChange={(e) => {setLastName(e.target.value)}} sx={{ fontFamily: "Monospace", paddingTop: "15px", textAlign: "center"}}>
        
        </TextField>

        <TextField placeholder="E-post" onChange={(e) => {setEmail(e.target.value)}} sx={{ fontFamily: "Monospace", paddingTop: "15px", textAlign: "center"}}>
        
        </TextField>

        <TextField placeholder="skole/foreleser" onChange={(e) => {setSchool(e.target.value)}} sx={{ fontFamily: "Monospace", paddingTop: "15px", textAlign: "center"}}>
        
        </TextField>
      
        <TextField placeholder="Passord" type="password" onChange={(e) => {setPassword(e.target.value)}} sx={{ fontFamily: "Monospace", paddingTop: "15px", paddingBottom: "20px" }}>
  
        </TextField>
      

      <Box textAlign={"center"}>
      <div>
        <Button variant="outlined" onClick={handleAddUser}>
          Registrer bruker
           
        </Button>

        
      </div>
      <Button variant="outlined" sx={{margin: 2}}onClick={handleBack}>
          Tilbake til Logg Inn
        </Button>

      </Box>
    

      </Grid>


        </Container>
        <Box sx={{ position: 'fixed', right: 0, bottom: 0, p: 2 }}>
        <DarkmodeSwitch />
      </Box>
        
    </div>
    
}