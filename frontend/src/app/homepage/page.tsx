"use client";
import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  CardContent,
  Card,
  CardActions,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { getProfile, reloadProfile } from "../utils/LocalStorage/profile";
import { DeckDto } from "../utils/dto/DeckDto";
import { requests } from "../utils/Api/requests";

const HomePage: React.FC = () => {
  
  const [decks, setDecks] = useState<DeckDto[]>( getProfile().ownedDecks );
  
  const addNewDeckButtonPressed = async () => {
    const newDeck: DeckDto = {deckId: 0, deckName: `Nytt dekk ${Math.ceil(Math.random() * 1000)}`, cardList: []};
    requests.addNewDeck(newDeck, getProfile().profileId );
    await reloadProfile();
    setDecks( getProfile().ownedDecks );
  }
  
  const deleteDeckButtonPressed = async (deckId: number) => {
    requests.deleteDeck(deckId);
    await reloadProfile();
    setDecks( getProfile().ownedDecks );
  }
  
  const editDeckButtonPressed = (deckId: number) => {
    window.location.href = `/edit/${deckId}`
  }
  
  const viewDeckButtonPressed = (deckId: number) => {
    window.location.href = `/view/${deckId}`
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
              <Button
                component="a" sx={{ m: "0rem", p: "0rem" }} 
                onClick={ () => viewDeckButtonPressed(deck.deckId) }
              >
                <CardContent>
                  <Typography variant="h6">{deck.deckName}</Typography>
                  <Typography variant="body2">
                    {deck.cardList.length} kort
                  </Typography>
                </CardContent>
              </Button>
              <CardActions>
                <Button onClick={ () => editDeckButtonPressed(deck.deckId) }>
                  Rediger
                </Button>
                <Button onClick={ () => deleteDeckButtonPressed(deck.deckId) }>
                  Slett
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid key={1} item xs={6} sm={3} md={2} lg={1}>
          <Card>
            <Button component="a" sx={{ m: "0rem", p: "0rem", paddingTop: "10px", paddingBottom: "10px" }} onClick={addNewDeckButtonPressed}>
              <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-28/512/1034_Add_new_plus_sign-512.png" />
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
