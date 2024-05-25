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
import Navbar from "../components/Navbar";
import { getProfile, reloadProfile } from "../utils/localStorage/profile";
import { DeckDto } from "../utils/dto/DeckDto";
import { requests } from "../utils/api/requests";
import DarkmodeSwitch from "../components/DarkmodeSwitch";

const MyFavoritesPage: React.FC = () => {
  
  const [decks, setDecks] = useState<DeckDto[]>(getProfile().ownedDecks);
  
  
  const viewDeckButtonPressed = (deckId: number) => {
    window.location.href = `/flipcard/${deckId}`
  }

  const fetchDecks = async () => {
      try {
          const response = await requests.getFavoriteDecks(getProfile().profileId);
          setDecks(response);
      } catch (error) {
          console.error("Error fetching decks:", error);
      }
  };

  useEffect(() => {
      fetchDecks();
  }, []);
  
  return (
    <div>
      <Navbar selected={3}/>

      <Typography
        variant="h5"
        component="div"
        sx={{
          textDecoration: "underline",
          marginLeft: "2rem",
          marginTop: "2rem",
          fontSize: "3rem",
        }}
      >
        Mine Favoritter
      </Typography>

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
                
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ position: 'fixed', right: 0, bottom: 0, p: 2 }}>
        <DarkmodeSwitch />
      </Box>
    </div>
  );
};

export default MyFavoritesPage;
