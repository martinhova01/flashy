"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { requests } from "../../../utils/api/requests";
import { ProfileDto } from "../../../utils/dto/ProfileDto";
import AdminNavbar from "../../../components/AdminNavbar";
import DarkmodeSwitch from "../../../components/DarkmodeSwitch";

const AdminProfilesPage = () => {
  const [profiles, setProfiles] = useState<ProfileDto[]>([]);

  const fetchProfiles = async () => {
    try {
      // getProfile
      const fetchedProfiles = await requests.getAllProfiles();
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

  const deleteProfile = async (profileId: number) => {
    try {
      await requests.deleteProfile(profileId);
      console.log(`Deleted profile ${profileId} sucsessfully`);
    } catch (error) {
      console.log("Error deleting profile:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleEdit = (profileId: number) => {
    // Redirect to the edit page
    window.location.href = `/admin/editProfile/${profileId}`;
  };

  const handleDelete = (profileId: number) => {
    deleteProfile(profileId);
    setProfiles(profiles.filter((profile) => profile.profileId !== profileId));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <AdminNavbar selected={0} />
      <Typography variant="h4" gutterBottom>
        Administrer brukere
      </Typography>
      <Divider />

      {profiles && profiles.length > 0 ? (
        <Grid container spacing={2} marginTop={2}>
          {profiles.map((profile) => (
            <Grid key={profile.profileId} item xs={12}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">{profile.email}</Typography>
                <Typography>{`Name: ${profile.firstname} ${profile.lastname}`}</Typography>
                <Typography>{`School: ${profile.school}`}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(profile.profileId)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(profile.profileId)}
                  sx={{ marginLeft: 1 }}
                >
                  Delete
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" marginTop={2}>
          No user profiles found.
        </Typography>
      )}
      <Box sx={{ position: 'fixed', right: 0, bottom: 0, p: 2 }}>
        <DarkmodeSwitch />
      </Box>
    </Box>
  );
};

export default AdminProfilesPage;
