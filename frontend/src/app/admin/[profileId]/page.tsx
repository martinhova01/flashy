"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, Checkbox } from "@mui/material";
import { requests } from "@/app/utils/Api/requests";
import { ProfileDto } from "@/app/utils/dto/ProfileDto";

const Page = ({ params }: { params: { profileId: string } }) => {
  const [profile, setProfile] = useState<ProfileDto>();

  const fetchProfile = async () => {
    try {
      const fetchedProfile = await requests.getProfileById(
        Number(params.profileId)
      );
      if (fetchedProfile) {
        setProfile(fetchedProfile);
      } else {
        console.log("Could not get profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (params) {
      fetchProfile();
    }
  }, [params]);

  const handleSave = async () => {
    // Implement save logic using editedProfile data
    if (profile) {
      try {
        await requests.updateProfile(profile);
        window.location.href = "/admin";
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No profile");
    }
  };

  const handleFieldChange = (fieldName: keyof ProfileDto, value: string) => {
    if (profile) {
      setProfile((prevProfile: any) => {
        if (!prevProfile) return null;
        return { ...prevProfile, [fieldName]: value };
      });
    }
  };

  const handleAdminCheckboxChange = () => {
    if (profile) {
      setProfile((prevProfile: any) => {
        if (!prevProfile) return null;
        return { ...prevProfile, admin: !prevProfile.admin };
      });
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>

      {profile ? (
        <>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={profile.email || ""}
            onChange={(e) => handleFieldChange("email", e.target.value)}
          />
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={profile.firstname || ""}
            onChange={(e) => handleFieldChange("firstname", e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={profile.lastname || ""}
            onChange={(e) => handleFieldChange("lastname", e.target.value)}
          />
          <TextField
            label="School"
            fullWidth
            margin="normal"
            value={profile.school || ""}
            onChange={(e) => handleFieldChange("school", e.target.value)}
          />

          <TextField
            label="Password"
            fullWidth
            margin="normal"
            value={profile.password || ""}
            onChange={(e) => handleFieldChange("password", e.target.value)}
          />

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1">Admin</Typography>
            <Checkbox
              checked={profile.admin || false}
              onChange={handleAdminCheckboxChange}
            />
          </Box>

          <Button variant="outlined" onClick={handleSave} sx={{ marginTop: 2 }}>
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              window.location.href = "/admin";
            }}
            sx={{ marginTop: 2 }}
          >
            Avbryt
          </Button>
        </>
      ) : (
        <Typography variant="body1" marginTop={2}>
          No user profiles found.
        </Typography>
      )}
    </Box>
  );
};

export default Page;
