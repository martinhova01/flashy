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

const page = () => {
  const [fornavn, setFornavn] = useState("Nils");
  const [etternavn, setEtternavn] = useState("123");
  const [email, setEmail] = useState("Nils@hotmail.com");
  const [school, setSchool] = useState("NTNU");

  return (
    <Box sx={{ height: 400 }}>
      <Button
        variant="outlined"
        sx={{ margin: "0.5rem", borderRadius: "0rem" }}
      >
        Flashy
      </Button>
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
          <Button variant="outlined" size="small">
            Rediger
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default page;
