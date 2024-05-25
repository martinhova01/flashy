"use client";

import { requests } from "@/app/utils/api/requests";
import { CardDto } from "@/app/utils/dto/CardDto";
import {
  Typography,
  Grid,
  Button,
  Container,
  Box,
} from "@mui/material";
import { getProfile } from "@/app/utils/localStorage/profile";

import { useEffect, useState } from "react";
import CommentSection from "../../components/CommentSection";
import FlipCardArea from "../../components/FlipCardArea";
import { CommentDto } from "@/app/utils/dto/CommentDto";
import { DeckDto } from "@/app/utils/dto/DeckDto";
import DarkmodeSwitch from "@/app/components/DarkmodeSwitch";

export default function FlashcardPage({ params }: { params: { deckId: number } }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState(0);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const profile = getProfile();
  const [cards, setCards] = useState<CardDto[]>();
  const [originalCards, setOriginalCards] = useState<CardDto[]>();
  const [progress, setProgress] = useState(0);
  const [comment, setComment] = useState(''); //Nåværende kommentar
  const [comments, setComments] = useState<CommentDto[]>([]); // Lagrer kommentarer
  const [sendCommentColor, setSendCommentColor] = useState<string>("#ffffff");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  }

  const handleAddComment = async () => {
    if (comment.trim()) {
      const result = await requests.addComment(profile.profileId, params.deckId, comment);
      const newComment: CommentDto = {firstname: profile.firstname, lastname: profile.lastname, comment: comment};
      setComments([...comments, newComment]);
      setComment(""); // Nullstiller kommentarfelt
    }
  }

  function handleBack() {
    window.location.href = "/browse";
  }

  const fetchDeck = async () => {
    try {
      
      const deck: DeckDto = await requests.getDeckByDeckId(Number(params.deckId));

      // Use optional chaining to check for undefined
      setCards(deck.cardList);
      setOriginalCards(deck.cardList); //kopi av orginal kortene
      
      const commentsRequest = await requests.getComments(params.deckId);
      setComments(commentsRequest);
      
      setCards(deck.cardList);
      setOriginalCards(deck.cardList); //kopi av orginal kortene
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchDeck();
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
      const newProgress =
        card === cards.length - 1 ? 0 : ((card + 1) / cards.length) * 100;
      setProgress(newProgress);
    }
  };

  const handleResetOrder = () => {
    if (originalCards && originalCards.length > 0) {
      setCards([...originalCards]);
      setCard(0);
      setIsFlipped(false);
      setProgress(0);
    }
  };

  function shuffleCards(cardsArray: CardDto[]) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    setProgress(0)
    return cardsArray;
  }
  
  const handleHard = () => {
    setIsFlipped(false);

    if (cards == undefined) {
      return
    }
    
    const updatedCards = [...cards];
    const tempCard = updatedCards[card];
    
    // Remove the card at the current index
    updatedCards.splice(card, 1);
    
    // Add the removed card to the end of the array
    updatedCards.push(tempCard);
    
    // Update the state with the new array
    setCards(updatedCards);
    
    const newProgress = (card / updatedCards.length) * 100;
    setProgress(newProgress);
    setIsFlipped(false);
  };
  
  let [metadata, setMetadata] = useState<String[]>([
    "Laster eier ...",
    "Laster dekknavn ..."
  ]);
  
  const fetchMetadata = async () => {
    let newMetadata = metadata;
    const owner = await requests.getOwner(params.deckId);
    newMetadata[0] = `${owner} sitt dekk`;
    const deck = await requests.getDeckByDeckId(params.deckId);
    newMetadata[1] = deck.deckName;
    setMetadata(newMetadata);
  }
  
  useEffect( () => { fetchMetadata() }, [] );
  
  return (
    <div>
    
    <Container>
      
      <Grid container direction={"column"}>
        
        <Grid container item spacing={2} style={{padding: "1rem"}} md={1} direction={"row"} >
          
          <Grid container item md={10} direction="column">
            {metadata.map( text => 
              <Typography variant="h6" textAlign={"left"} key={0}>
                {text}
              </Typography>
            )}
          </Grid>
          
          <Grid item md={2}>
            <Button variant="outlined" onClick={handleBack}>
              Tilbake
            </Button>
          </Grid>
          
        </Grid>
        
        <Grid container item spacing={2} style={{padding: "1rem"}} md={11}>
          
          { /* md = 7 */ }
          { FlipCardArea(progress, isFlipped, handleFlip, cards, card, handleHard, handleNextCard, handleShuffleOnly, handleResetOrder) }
          
          { /* md = 5 */}
          { CommentSection(comment, handleCommentChange, handleAddComment, comments, profile, sendCommentColor) }
              
        </Grid>
        
      </Grid>
      
    </Container>
    <Box sx={{ position: 'fixed', right: 0, bottom: 0, p: 2 }}>
        <DarkmodeSwitch />
    </Box>
    </div>
    
  );
}
