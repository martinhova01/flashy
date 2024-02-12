import { Typography, Container, TextField, Grid, Box, Button } from "@mui/material";

export default function SignUpPage() {
    
    return <div>
        
        <Container>

        <Typography sx={{ fontFamily: "Italic", fontSize: 80, textAlign: "center", paddingTop: "30px" }}>
        Opprett bruker
      </Typography>
      
      <Typography sx={{ fontFamily: "Monospace", fontSize: 28, textAlign: "center", paddingTop: "30px" }}>
        Fyll inn informasjon
      </Typography>

      <Grid container direction={"column"} alignContent={"center"}>
        
        <TextField placeholder="Fornavn" sx={{ fontFamily: "Monospace", paddingTop: "40px", textAlign: "center"}}>
        
        </TextField>
       
        <TextField placeholder="Etternavn" sx={{ fontFamily: "Monospace", paddingTop: "40px", textAlign: "center"}}>
        
        </TextField>

        <TextField placeholder="E-post" sx={{ fontFamily: "Monospace", paddingTop: "40px", textAlign: "center"}}>
        
        </TextField>

        <TextField placeholder="skole/foreleser" sx={{ fontFamily: "Monospace", paddingTop: "40px", textAlign: "center"}}>
        
        </TextField>
      
        <TextField placeholder="Passord" sx={{ fontFamily: "Monospace", paddingTop: "40px", paddingBottom: "40px" }}>
  
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