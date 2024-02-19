"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  CardContent,
  Card,
  CardActions,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { ProfileDto } from "../utils/dto/ProfileDto";
import { getProfile } from "../utils/LocalStorage/profile";

const HomePage: React.FC = () => {
  
  let decks = getProfile().ownedDecks;
  decks.push({deckId: 2, name: "ABC", cards: []})
  
  console.log(getProfile().email);
  
  function addNewDeck() {
    // use API to add new deck
    
  }
  
  return (
    <div>
      <Navbar />

      <Grid
        container
        spacing={1}
        sx={{
          p: "2rem",
          m: "1rem",
        }}
      >
        {decks.map((deck) => (
          <Grid key={deck.deckId} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Button component="a" sx={{ m: "0rem", p: "0rem" }}>
                <CardContent>
                  <Typography variant="h6">{deck.name}</Typography>
                  <Typography variant="body2">
                    {deck.cards.length} kort
                  </Typography>
                </CardContent>
              </Button>
              <CardActions>
                <Button>Rediger</Button>
                <Button>Slett</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid key={decks.length} item xs={6} sm={3} md={2} lg={1}>
          <Card>
            <Button component="a" sx={{ m: "0rem", p: "0rem", paddingTop: "10px", paddingBottom: "10px" }} onClick={addNewDeck}>
                <CardContent>
                  <Typography variant="h6">Nytt sett</Typography>
                </CardContent>
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
