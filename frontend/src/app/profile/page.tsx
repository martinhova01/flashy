"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { ProfileDto } from "../utils/dto/ProfileDto";
import Navbar from "../components/Navbar";

const page = () => {

  const storedProfileString = localStorage.getItem("profile");
  const storedProfile: ProfileDto = storedProfileString
  ? JSON.parse(storedProfileString)
  : null;


  const [fornavn, setFornavn] = useState(storedProfile.firstname);
  const [etternavn, setEtternavn] = useState(storedProfile.lastname);
  const [email, setEmail] = useState(storedProfile.email);
  const [school, setSchool] = useState(storedProfile.school);

  const editProfile = () => {
    window.location.href= "/profile/editProfile";
  }

  return (
    
    <Box sx={{ height: 400 }}>
      <Navbar />
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
        Profil
      </Typography>
      <Card
        sx={{
          maxWidth: 400,
          margin: "1rem",
          marginLeft: "1.5rem",
          border: "1px solid #ccc",
          maxHeight: 400,
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            className="p-1"
            sx={{ fontSize: "1rem" }}
          >
            Fornavn: {fornavn}
            <br />
            Etternavn: {etternavn} <br />
            E-post: {email} <br />
            Studie/foreleser: {school} <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small" onClick={editProfile}>
            Rediger
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default page;
