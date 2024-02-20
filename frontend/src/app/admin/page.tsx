"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { requests } from "../utils/Api/requests";
import { ProfileDto } from "../utils/dto/ProfileDto";

const page = () => {
  const [profiles, setProfiles] = useState<ProfileDto[]>([
    {
      profileId: 1,
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      school: "",
      ownedDecks: [],
      admin: false,
    },
  ]);

  const fetchData = async () => {
    try {
      // getProfile
      const fetchedProfiles = (await requests.getAllProfiles()) as ProfileDto[];

      // check if profile exists
      if (fetchedProfiles) {
        setProfiles(fetchedProfiles);
      } else {
        console.log("Could not get profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {profiles.map((profile) => (
          <Grid key={profile.profileId} item xs={12} sm={6} md={4} lg={3}>
            {/* Render your profile component here */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default page;
