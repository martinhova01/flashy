"use client";

import { Typography, Container, TextField, Grid, Box, Button } from "@mui/material";

export default function Home() {
  
  
  function moveToSignUpPage() {
    window.location.href = "/signup"
  }
  
  
  return <div>
    
    <Container>
        
      <Typography sx={{ fontFamily: "Italic", fontSize: 100, textAlign: "center", paddingTop: "30px" }}>
        Flashy
      </Typography>
      
      <Typography sx={{ fontFamily: "Monospace", fontSize: 30, textAlign: "center", paddingTop: "30px" }}>
        Logg inn
      </Typography>

      <Grid container direction={"column"} alignContent={"center"}>
        
        <TextField placeholder="E-post" sx={{ fontFamily: "Monospace", paddingTop: "40px", textAlign: "center"}}>
        
        </TextField>
       
      
      
        <TextField placeholder="Passord" sx={{ fontFamily: "Monospace", paddingTop: "40px", paddingBottom: "40px" }}>
  
        </TextField>
      

      <Box textAlign={"center"}>
      <div>
        <Button variant="contained">
          Logg inn
           
        </Button>
      </div>
      <div>
        <Button variant="text" sx={{paddingTop: "30px"}} onClick={moveToSignUpPage}>
          Lag ny bruker
           
        </Button>
      </div>
      </Box>
    

      </Grid>

      
      
      
    </Container>
    
  </div>
  
}

