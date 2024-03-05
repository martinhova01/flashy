"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { requests } from "../utils/Api/requests";
import { DeckDto } from "../utils/dto/DeckDto";
import AdminNavbar from "../components/AdminNavbar";

const page = () => {
  const [decks, setDecks] = useState<DeckDto[]>([]);

  const fetchDecks = async () => {
    try {
      // getProfile
      const fetchedDecks = await requests.getAllPublicDecks();
        // check if profile exists
        if (fetchedDecks) {
          setDecks(fetchedDecks);
        } else {
          console.log("Could not get decks");
        }
    } catch (error) {
      console.error("Error fetching deck:", error);
    }
  };

  const deleteDeck = async (deckId: number) => {
    try {
      await requests.deleteDeck(deckId);
      console.log(`Deleted deck ${deckId} sucsessfully`);
    } catch (error) {
      console.log("Error deleting deck:", error);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleEdit = (profileId: number) => {
    // Redirect to the edit page
    window.location.href = `/admin/${profileId}`;
  };

  const handleDelete = (deckId: number) => {
    deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck.deckId !== deckId));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <AdminNavbar selected={1} />
      <Typography variant="h4" gutterBottom>
        Administrer offentlige dekk
      </Typography>
      <Divider />

      {decks && decks.length > 0 ? (
        <Grid container spacing={2} marginTop={2}>
          {decks.map((deck) => (
            <Grid key={deck.deckId} item xs={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">{deck.deckName}</Typography>
                <Typography>{`Category: ${deck.category}`}</Typography>
                <Typography>{`Deck ID: ${deck.deckId}`}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(deck.deckId)}
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
          No user decks found.
        </Typography>
      )}
    </Box>
  );
};

export default page;
