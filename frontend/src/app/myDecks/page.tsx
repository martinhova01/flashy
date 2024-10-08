"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  CardContent,
  Card,
  CardActions,
  Box,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { getProfile, reloadProfile } from "../../utils/localStorage/profile";
import { DeckDto } from "../../utils/dto/DeckDto";
import { requests } from "../../utils/api/requests";
import { CardDto } from "../../utils/dto/CardDto";
import DarkmodeSwitch from "../../components/DarkmodeSwitch";

const MyDecksPage: React.FC = () => {
  
  const [decks, setDecks] = useState<DeckDto[]>([]);
  
  const addNewDeckButtonPressed = async () => {
    const emptyCard: CardDto = {cardNumber: 0, frontpageString: "", frontpagePicture: "", backpageString: "", backpagePicture: ""};
    const newDeck: DeckDto = {deckId: 0, deckName: `Nytt dekk ${Math.ceil(Math.random() * 1000)}`, cardList: [emptyCard], visibility: 0, category: "Annet", likes: 0};
    await requests.addNewDeck(newDeck, getProfile().profileId );
    await reloadProfile();
    setDecks( getProfile().ownedDecks );
  }
  
  const deleteDeckButtonPressed = async (deckId: number) => {
    await requests.deleteDeck(deckId);
    await reloadProfile();
    setDecks( getProfile().ownedDecks );
  }
  
  const editDeckButtonPressed = (deckId: number) => {
    window.location.href = `/editDeck/${deckId}`
  }
  
  const viewDeckButtonPressed = (deckId: number) => {
    window.location.href = `/flipcard/${deckId}`
  }

  useEffect(() => {
    setDecks(getProfile().ownedDecks);
  }, []);

  
  
  return (
    <div>
      <Navbar selected={1}/>

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
                  {/*forsidebilde på et sett*/}
              {deck.cardList[0].frontpagePicture && (
            <img 
              src={deck.cardList[0].frontpagePicture} 
              alt="Front of Card" 
              style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} // bildeintegrasjon
            />
          )}
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
              <img  alt={""} style={{ width: '100%', height: '100%' }} src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-28/512/1034_Add_new_plus_sign-512.png" />
            </Button>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ position: 'fixed', right: 0, bottom: 0, p: 2 }}>
        <DarkmodeSwitch />
      </Box>
    </div>
  );
};

export default MyDecksPage;
