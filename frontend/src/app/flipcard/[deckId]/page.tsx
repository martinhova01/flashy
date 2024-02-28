"use client";

import { requests } from "@/app/utils/Api/requests";
import { CardDto } from "@/app/utils/dto/CardDto";
import { Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function flashcard({ params }: { params: { deckId: number } }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState(0);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const [cards, setCards] = useState<CardDto[]>();

  function handleBack() {
    window.location.href = "/homepage";
  }
  const fetchCard = async () => {
    try {
      const request = await requests.getCardsByDeckId(Number(params.deckId));

      // Use optional chaining to check for undefined
      setCards(request);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  const changeCard = () => {
    
  }

  return (
    <Grid container>
      <Grid item>
        <Button
          variant="outlined"
          style={{ margin: "1rem" }}
          onClick={handleBack}
        >
          Tilbake
        </Button>
      </Grid>

      <Grid item marginTop={"1rem"}>
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          <Card className={"card"} onClick={handleFlip}>
            <CardContent
              sx={{
                width: "35rem",
                height: "25rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="h2">
                {cards && cards.length > 0
                  ? cards[card]!.frontpageString
                  : "Loading"}
              </Typography>
            </CardContent>
          </Card>

          <Card className="card card-back" onClick={handleFlip}>
            <CardContent
              sx={{
                width: "35rem",
                height: "25rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="h2">
                {cards && cards.length > 0
                  ? cards[card]!.backpageString
                  : "Loading"}
              </Typography>
            </CardContent>
          </Card>
        </ReactCardFlip>

        <Button variant="outlined" color="error" style={{ margin: "1rem" }}>
          Vanskelig
        </Button>

        <Button
          variant="outlined"
          color="success"
          style={{ marginLeft: "20rem" }}
        >
          Lett
        </Button>
      </Grid>
    </Grid>
  );
}
