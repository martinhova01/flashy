"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { ProfileDto } from "../../utils/dto/ProfileDto";
import Navbar from "../../components/Navbar";
import DarkmodeSwitch from "../../components/DarkmodeSwitch";
import { getProfile } from "../../utils/localStorage/profile";

const ProfilePage = () => {

  
  const [storedProfile, setStoredProfile] = useState<ProfileDto>();

  const [fornavn, setFornavn] = useState<String>("laster...");
  const [etternavn, setEtternavn] = useState<String>("laster...");
  const [email, setEmail] = useState<String>("laster...");
  const [school, setSchool] = useState<String>("laster...");

  const editProfile = () => {
    window.location.href= "/editProfile";
  }

  useEffect(() => {
    setStoredProfile(getProfile());
  }, []);

  useEffect(() => {
    if (storedProfile) {
      setFornavn(storedProfile.firstname);
      setEtternavn(storedProfile.lastname);
      setEmail(storedProfile.email);
      setSchool(storedProfile.school);
    }
  }, [storedProfile]);



  return (
    
    <Box sx={{ height: 400 }}>
      <Navbar selected={2}/>
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
      <Box sx={{ position: 'fixed', right: 0, bottom: 0, p: 2 }}>
        <DarkmodeSwitch />
      </Box>
    </Box>
  );
};

export default ProfilePage;
