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
  
  const [decks, setDecks] = useState<DeckDto[]>( [ ...getProfile().ownedDecks, { deckId: 3, deckName: "abc", cardList: [] } ] );
  
  const addNewDeckButtonPressed = async () => {
    
    console.log("Attempting to add new deck ...")
    
    const profileId = getProfile().profileId;
    const newDeck: DeckDto = {deckId: 0, deckName: "Nytt dekk", cardList: []};
    
    console.log(`ProfileID: ${profileId} and newDeck = ${newDeck}`);
    
    requests.addNewDeck(newDeck, profileId);
    
    console.log("Now after addNewDeck");
    
    await reloadProfile();
    
    console.log("didReloadProfile")
    
    setDecks( getProfile().ownedDecks );
    
    console.log("finished addNewDeck");
    
  }
  
  const deleteDeckButtonPressed = async (deckId: number) => {
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
                  <Typography variant="h6">{deck.deckName}</Typography>
                  <Typography variant="body2">
                    {deck.cardList.length} kort
                  </Typography>
                </CardContent>
              </Button>
              <CardActions>
                <Button>
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
