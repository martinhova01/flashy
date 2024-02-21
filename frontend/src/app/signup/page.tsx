"use client"
import { Typography, Container, TextField, Grid, Box, Button } from "@mui/material";
import { useState } from "react";

export default function SignUpPage() {

  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [school, setSchool] = useState<String>("");
  const [password, setPassword] = useState<String>("");


  function moveToSignUpPage() {
    window.location.href = "/homepage"
  }

  function handleAddUser() {
    // const profile: ProfileDto = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email,
    //   school: school,
    //   password: password
    // }

    // await re

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
      
        <TextField placeholder="Passord" onChange={(e) => {setPassword(e.target.value)}} sx={{ fontFamily: "Monospace", paddingTop: "15px", paddingBottom: "20px" }}>
  
        </TextField>
      

      <Box textAlign={"center"}>
      <div>
        <Button variant="contained" onClick={handleAddUser}>
          Registrer bruker
           
        </Button>
      </div>

      </Box>
    

      </Grid>


        </Container>
        
    </div>
    
}