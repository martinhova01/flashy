"use client";

import {
  Typography,
  Container,
  TextField,
  Grid,
  Box,
  Button,
  Link,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { requests } from "./utils/Api/requests";
import { ProfileDto } from "./utils/dto/ProfileDto";
import { getProfile, loadProfile } from "./utils/LocalStorage/profile";
import DarkModeSwitch from "./components/DarkmodeSwitch";

const Page = () => {
  const [email, setemail] = useState<String>("");
  const [password, setpassword] = useState<String>("");


  const fetchData = async (event: React.FormEvent) => {
    event.preventDefault(); // Forhindrer standardformsubmitting
    try {
      if (await loadProfile(email, password)) {
        const profile = getProfile();
        if (profile.admin) {
          window.location.href = "/admin";
        } else {
          window.location.href = "/browse";
        }
      } else {
        alert("feil epost eller passord.")
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleTextFieldChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setemail(event.target.value);
  };

  const handleTextFieldChangePassword = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setpassword(event.target.value);
  };

  return (
    <div>
      <Container>
        <Typography
          sx={{
            fontFamily: "Italic",
            fontSize: 100,
            textAlign: "center",
            paddingTop: "30px",
          }}
        >
          Flashy
        </Typography>

        <Typography
          sx={{
            fontFamily: "Monospace",
            fontSize: 30,
            textAlign: "center",
            paddingTop: "30px",
          }}
        >
          Logg inn
        </Typography>

        <form onSubmit={fetchData}>

        <Grid container direction={"column"} alignContent={"center"}>
          <TextField
            placeholder="E-post"
            sx={{
              fontFamily: "Monospace",
              paddingTop: "40px",
              textAlign: "center",
            }}
            value={email}
            onChange={handleTextFieldChangeEmail}
          ></TextField>

          <TextField
            placeholder="Passord"
            type="password"
            sx={{
              fontFamily: "Monospace",
              paddingTop: "40px",
              paddingBottom: "40px",
            }}
            value={password}
            onChange={handleTextFieldChangePassword}
          ></TextField>

          <Box textAlign={"center"}>
            <div>
              <Button onClick={fetchData} variant="outlined" type="submit">
                Logg inn
              </Button>
            </div>
            <div>
              <Link href="/signup">
                <Button variant="text" sx={{ paddingTop: "30px" }}>
                  Lag ny bruker
                </Button>
              </Link>
            </div>
          </Box>
        </Grid>
        </form>
      </Container>
      <Box sx={{ position: 'fixed', right: 0, bottom: 0, p: 2 }}>
        <DarkModeSwitch />
      </Box>
    </div>
  );
};

export default Page;
