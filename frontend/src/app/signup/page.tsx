import { Typography, Container, TextField, Grid, Box, Button } from "@mui/material";

export default function SignUpPage() {
    
    return <div>
        
        <Container>

        <Typography sx={{ fontFamily: "Italic", fontSize: 80, textAlign: "center", paddingTop: "10px" }}>
        Opprett bruker
      </Typography>
      
      <Typography sx={{ fontFamily: "Monospace", fontSize: 28, textAlign: "center", paddingTop: "10px" }}>
        Fyll inn informasjon
      </Typography>

      <Grid container direction={"column"} alignContent={"center"}>
        
        <TextField placeholder="Fornavn" sx={{ fontFamily: "Monospace", paddingTop: "15px", textAlign: "center"}}>
        
        </TextField>
       
        <TextField placeholder="Etternavn" sx={{ fontFamily: "Monospace", paddingTop: "15px", textAlign: "center"}}>
        
        </TextField>

        <TextField placeholder="E-post" sx={{ fontFamily: "Monospace", paddingTop: "15px", textAlign: "center"}}>
        
        </TextField>

        <TextField placeholder="skole/foreleser" sx={{ fontFamily: "Monospace", paddingTop: "15px", textAlign: "center"}}>
        
        </TextField>
      
        <TextField placeholder="Passord" sx={{ fontFamily: "Monospace", paddingTop: "15px", paddingBottom: "20px" }}>
  
        </TextField>
      

      <Box textAlign={"center"}>
      <div>
        <Button variant="contained">
          Registrer bruker
           
        </Button>
      </div>

      </Box>
    

      </Grid>


        </Container>
        
    </div>
    
}