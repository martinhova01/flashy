"use client";

import { Typography, Container, TextField } from "@mui/material";

export default function Home() {
  
  return <div>
    
    <Container>
        
      <Typography sx={{ fontFamily: "Monospace", fontSize: 60, textAlign: "center", paddingTop: "40px" }}>
        Flashy
      </Typography>
      
      <Typography sx={{ fontFamily: "Monospace", fontSize: 30, textAlign: "center", paddingTop: "40px" }}>
        Logg inn
      </Typography>
      
      <TextField placeholder="E-post" sx={{ fontFamily: "Monospace", paddingTop: "40px" }}>
        
      </TextField>
      
    </Container>
    
  </div>
  
}

