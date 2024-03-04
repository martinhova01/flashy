"use client";

import { requests } from "@/app/utils/Api/requests";
import { CardDto } from "@/app/utils/dto/CardDto";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  TextField,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";

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
  const [progress, setProgress] = useState(0);
  const [comment, setComment] = useState(''); //Nåværende kommentar
  const [comments, setComments] = useState<string[]>([]); //lagrer kommentar

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  }

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment(""); //nullstiller kommentarfelt
    }
  }

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
      setCard((prevCard) => (prevCard + 1) % cards.length);
      setIsFlipped(false);
      const newProgress = ((card + 1) / cards.length) * 100;
      setProgress(newProgress);
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
    <Grid 
      container 
      spacing={2}
      style={{
        padding: "1rem"
      }}
      >
      <Grid 
      item xs={12}
      style={{ 
        display: "flex", 
        justifyContent: "flex-end",
        
      }}
      >
        <Button
          variant="outlined"
          style={{ margin: "1rem" }}
          onClick={handleBack}
        >
          Tilbake
        </Button>
      </Grid>

      <Grid 
        item xs= {12}
        md={7}
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignContent: "center", 
          justifyContent: "center" }}
        >
        <LinearProgress 
        variant="determinate" 
        value={progress}
        style={{ width: "35rem"}}  
        />


        <ReactCardFlip 
          flipDirection="horizontal" 
          isFlipped={isFlipped}>

          <Card 
            className={"card"} 
            onClick={handleFlip}
            style={{ 
              width: "35rem", 
              height: "25rem", 
              marginBottom: "1rem"}}>
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

          <Card 
            className="card card-back" 
            onClick={handleFlip}
            style={{
              width: "35rem",
              height: "25rem",
              marginBottom: "1rem"
            }}
            >
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

        <div>

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

        </div>
      </Grid>


      <Grid style={{paddingTop: "2rem"}}>
      <Paper 
        style={{
          height: "30rem",
          maxHeight: 300,
          overflow: "auto",
          width:"23rem"
        }}>
          <Typography  
            style={{ marginBottom: '1rem' }}>
                Kommentarer
          </Typography>
        {comments.map((comment, index) => (
          <Paper key={index} style={{ padding: "1rem 1rem", marginBottom: '1rem' }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item xs>
                <h4 style={{ margin: 0, textAlign: "left" }}>Bruker</h4> {/* Bytt ut med brukerens navn om nødvendig */}
                <p style={{ textAlign: "left" }}>{comment}</p>
                <p style={{ textAlign: "left", color: "gray" }}>postet for 1 minutt siden</p> {/* Oppdater med faktisk tidspunkt om nødvendig */}
              </Grid>
            </Grid>
            {index < comments.length - 1 && <Divider variant="fullWidth" style={{ margin: "30px 0" }} />}
          </Paper>
        ))}

      </Paper>

      <Grid container spacing={1}>
        <Grid>

        
        <TextField
          label="Legg til en kommentar"
          variant="outlined"
          value={comment}
          multiline
          rows={2}
          fullWidth
          onChange={handleCommentChange}
          style={{
            marginTop: "1rem",
            width: "20rem",
          }}
          >
          
        </TextField>
        </Grid>

        <Grid item style={{display: "flex", alignItems:"center"}} > 
        <Button
          variant="outlined"
          color="primary"
          style={{marginTop: "1rem"}}
          onClick={handleAddComment}
        >
          Send
        
        </Button>
      </Grid>
      </Grid>
      </Grid>
    </Grid>
  );
}
