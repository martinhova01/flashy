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
import { requests } from "../utils/Api/requests";
import { ProfileDto } from "../utils/dto/ProfileDto";

const Page = () => {
  const [email, setemail] = useState<String>("");
  const [password, setpassword] = useState<String>("");

  const fetchData = async () => {
    try {
      // getProfile
      const fetchedProfile = (await requests.getProfile(
        email,
        password
      )) as ProfileDto;

      // check if profile exists
      if (fetchedProfile) {
        localStorage.clear();
        localStorage.setItem("profile", JSON.stringify(fetchedProfile));
        window.location.href = "/homepage";
      } else {
        console.log("Could not get profile");
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
              <Button onClick={fetchData} variant="contained">
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
      </Container>
    </div>
  );
};

export default Page;
