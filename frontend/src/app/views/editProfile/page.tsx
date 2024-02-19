'use client'
import { requests } from '@/app/utils/Api/requests';
import { ProfileDto } from '@/app/utils/dto/ProfileDto';
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const page = () => {

  const storedProfileString = localStorage.getItem("profile");
  const storedProfile: ProfileDto = storedProfileString
  ? JSON.parse(storedProfileString)
  : null;

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");

  

  const save = async () => {

    const newProfile: ProfileDto = {
      profileId: storedProfile.profileId,
      email: email,
      password: password,
      firstname: name,
      lastname: lastName,
      school: school,
      ownedDecks: [],
      admin: false
    };

    if (!email) {
      newProfile.email = storedProfile.email;
    }
    if (!password) {
      newProfile.password = storedProfile.password;
    }
    if (!name) {
      newProfile.firstname = storedProfile.firstname;
    }
    if (!lastName) {
      newProfile.lastname = storedProfile.lastname;
    }
    if (!school) {
      newProfile.school = storedProfile.school;
    }
    
    await requests.updateProfile(newProfile);

    localStorage.clear();
    let profile: ProfileDto = await requests.getProfile(newProfile.email, newProfile.password);
    localStorage.setItem("profile", JSON.stringify(profile));
    
    window.location.href= "/views";
  }

  const cancel = () => {
    window.location.href= "/views";
  }



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
          maxHeight: 1000,
        }}
      >
        <CardContent>

        <Typography
        variant="h5"
        component="div"
        sx={{
          textDecoration: "underline",
          marginLeft: "2rem",
          fontSize: "1rem",
        }}
      >
        Fornavn: 
      </Typography>

      <TextField
            id="outlined-basic"
            variant="outlined"
            value={name} // Oppdater til å bruke 'name' som verdi
            label={storedProfile.firstname}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
            sx={{ margin: '2rem' }}
          />  <br/>

          <Typography
        variant="h5"
        component="div"
        sx={{
          textDecoration: "underline",
          marginLeft: "2rem",
          fontSize: "1rem",
        }}
      >
        Etternavn: 
      </Typography>

          <TextField
            id="outlined-basic"
            variant="outlined"
            value={lastName} // Oppdater til å bruke 'name' som verdi
            label={storedProfile.lastname}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLastName(event.target.value);
            }}
            sx={{ margin: '2rem' }}
          />  <br/>

          <Typography
        variant="h5"
        component="div"
        sx={{
          textDecoration: "underline",
          marginLeft: "2rem",
          fontSize: "1rem",
        }}
      >
        Mail: 
      </Typography>

          <TextField
            id="outlined-basic"
            variant="outlined"
            value={email} // Oppdater til å bruke 'name' som verdi
            label={storedProfile.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            sx={{ margin: '2rem' }}
          />  <br/>

      <Typography
        variant="h5"
        component="div"
        sx={{
          textDecoration: "underline",
          marginLeft: "2rem",
          fontSize: "1rem",
        }}
      >
        Passord: 
      </Typography>

      <TextField
        id="outlined-basic"
        variant="outlined"
        value={password} // Change 'school' to 'password'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
        }}
        sx={{ margin: '2rem' }}
      />  <br/>

          <Typography
        variant="h5"
        component="div"
        sx={{
          textDecoration: "underline",
          marginLeft: "2rem",
          fontSize: "1rem",
        }}
      >
        Skole: 
      </Typography>

          <TextField
            id="outlined-basic"
            variant="outlined"
            value={school} // Oppdater til å bruke 'name' som verdi
            label={storedProfile.school}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSchool(event.target.value);
            }}
            sx={{ margin: '2rem' }}
          />  <br/>

        </CardContent>
        <CardActions>
        <Button onClick={save}
        variant="outlined"
        sx={{ margin: "2rem", borderRadius: "0rem" }}
      >
        Lagre
      </Button>
      <Button onClick={cancel}
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