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
  const [originalCards, setOriginalCards] = useState<CardDto[]>();

  function handleBack() {
    window.location.href = "/homepage";
  }

  const fetchCard = async () => {
    try {
      const request = await requests.getCardsByDeckId(Number(params.deckId));

      // Use optional chaining to check for undefined
      setCards(request);
      setOriginalCards(request); //kopi av orginal kortene
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  const handleShuffleOnly = () => {
    if (originalCards && originalCards.length > 0) {
      const shuffled = shuffleCards([...originalCards]);
      setCards(shuffled);
      setCard(0);
      setIsFlipped(false);
    }
  };
  const handleNextCard = () => {
    if (cards && cards.length > 0) {
      setCard((prevCard) => (prevCard + 1) % cards.length); // Går til neste kort, og looper tilbake til start
      setIsFlipped(false);
    }
  };

  const handleResetOrder = () => {
    if (originalCards && originalCards.length > 0) {
      setCards([...originalCards]);
      setCard(0);
      setIsFlipped(false);
    }
  };

  function shuffleCards(cardsArray: CardDto[]) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    return cardsArray;
  }

  const handleHard = () => {
    if (cards == undefined) {
      console.log("Ingen kort :/");
    } else {
      cards.push(cards[card]);
      handleNextCard();
    }
  };

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

        <Button
          variant="outlined"
          color="error"
          style={{ margin: "1rem" }}
          onClick={handleHard}
        >
          Vanskelig
        </Button>

        <Button
          variant="outlined"
          color="success"
          style={{ marginLeft: "1rem" }}
          onClick={handleNextCard}
        >
          Lett
        </Button>

        <Button
          variant="outlined"
          style={{ margin: "1rem" }}
          onClick={handleShuffleOnly}
        >
          Stokk kort
        </Button>

        <Button
          variant="outlined"
          style={{ margin: "1rem" }}
          onClick={handleResetOrder}
        >
          Tilbakestill rekkefølge
        </Button>
      </Grid>
    </Grid>
  );
}
