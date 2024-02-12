'use client'
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const page = () => {

const [name, setname] = useState("");
const [lastName, setlastName] = useState("");
const [email, setEmail] = useState("");
const [setschool, setSetschool] = useState("");

  return (
    <Box>
      <Typography
        variant="h5"
        component="div"
        sx={{
          textDecoration: "underline",
          marginLeft: "2rem",
          marginTop: "2rem",
          fontSize: "3rem",
        }}
      >
        Rediger profil
      </Typography>
      <Card
        sx={{
          maxWidth: 500,
          margin: "1rem",
          marginLeft: "1.5rem",
          border: "1px solid #ccc",
          maxHeight: 750,
        }}
      >
        <CardContent>

        
          <TextField id="outlined-basic" label="Fornavn" variant="outlined" sx={{margin: "2rem"}}/>  <br/>
          <TextField id="outlined-basic" label="Etternavn" variant="outlined" sx={{margin: "2rem"}}/>  <br/>
          <TextField id="outlined-basic" label="E-post" variant="outlined" sx={{margin: "2rem"}}/>  <br/>
          <TextField id="outlined-basic" label="Studie/Foreleser" variant="outlined" sx={{margin: "2rem"}}/>  <br/>
        </CardContent>
        <CardActions>
        <Button
        variant="outlined"
        sx={{ margin: "2rem", borderRadius: "0rem" }}
      >
        Lagre
      </Button>
      <Button
        variant="outlined"
        sx={{ margin: "0.15rem", borderRadius: "0rem" }}
      >
        Avbryt
      </Button>
        </CardActions>
      </Card>
    </Box>

    
  )
}

export default page