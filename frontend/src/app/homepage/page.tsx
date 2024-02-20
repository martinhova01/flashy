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
import { getProfile, loadProfile, reloadProfile } from "../utils/LocalStorage/profile";
import { DeckDto } from "../utils/dto/DeckDto";

const HomePage: React.FC = () => {
  
  const [decks, setDecks] = useState<DeckDto[]>( getProfile().ownedDecks );
  
  const addNewDeck = async () => {
    // Create a new DeckDto object.
    const newDeck: DeckDto = {deckId: Math.ceil(Math.random() * 100), name: "NewDeck" + Math.ceil(Math.random() * 100).toString(), cards: []}
    const updated = [...decks, newDeck];
    await reloadProfile();
    setDecks(updated); // getProfile().ownedDecks
  }
  
  const deleteDeck = async (deckId: number) => {
    // Delete deck number `deckId`.
    const updated = decks.filter( deck => deck.deckId != deckId );
    await reloadProfile();
    setDecks(updated); // getProfile().ownedDecks
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
                <Button>
                  Rediger
                </Button>
                <Button onClick={ () => deleteDeck(deck.deckId) }>
                  Slett
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid key={1} item xs={6} sm={3} md={2} lg={1}>
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
