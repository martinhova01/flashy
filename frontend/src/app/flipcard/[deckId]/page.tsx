"use client";

import { requests } from "@/app/utils/Api/requests";
import { CardDto } from "@/app/utils/dto/CardDto";
import { Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function flashcard({params} : {params: {deckId: number}}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const [cards, setCards] = useState<CardDto[]>([]);

  function handleBack() {
    window.location.href = "/homepage"
};
  const fetchCard = async () => {
    console.log(params)
    const request = await requests.getCardsByDeckId(Number(params.deckId))
    console.log(request)
  if(request){setCards(request) 
    console.log(cards)}
  else {
    console.log ("error fetching cards")
    }
  } 

  useEffect(() => {
    fetchCard()
  
   
  }, []);
  
  

  return (
    <Grid container>
      <Grid item>
        <Button variant="outlined" style={{ margin: "1rem" }} onClick={handleBack}>
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
                front side
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
                back side
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
