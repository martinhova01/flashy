"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import CircularButton from "../../components/CircularButton";
import { CardDto } from "../../utils/dto/CardDto";
import { DeckDto } from "../../utils/dto/DeckDto";
import { requests } from "../../utils/Api/requests";
import { ProfileDto } from "../../utils/dto/ProfileDto";
import { getProfile, reloadProfile } from "@/app/utils/LocalStorage/profile";
import { categories } from "@/app/utils/dto/Categories";

export default function EditDeck({params} : {params: {deckId: number}}) {

    

    const profile: ProfileDto = getProfile();
    const oldDeck: DeckDto = getDeck(params.deckId);

    const [deckName, setDeckName]= useState<String>(oldDeck.deckName);
    const [cardNr, setCardNr] = useState<number>(0);
    const [frontPage, setFrontPage] = useState<String>(oldDeck.cardList[0].frontpageString);
    const [backPage, setBackPage] = useState<String>(oldDeck.cardList[0].backpageString);
    const [cards, setCards] = useState<CardDto[]>(oldDeck.cardList);
    const [visibility, setVisbility] = useState<boolean>(oldDeck.visibility);
    const [category, setCategory] = useState<String>(oldDeck.category);


    function getDeck(deckId: number): any{
        for (let deck of profile.ownedDecks) {
            if (deck.deckId == deckId) {
                return deck;
            }
        }
    }
    

    function nextCard() {
        updateCards();
        if (cardNr + 1 == cards.length) {
            setFrontPage("");
            setBackPage("");
        }
        else{
            setFrontPage(cards[cardNr + 1].frontpageString);
            setBackPage(cards[cardNr + 1].backpageString);
        }
        setCardNr(cardNr + 1);
    }

    function prevCard() {
        updateCards()
        if (cardNr == 0) {
            return;
        }
        setFrontPage(cards[cardNr - 1].frontpageString);
        setBackPage(cards[cardNr - 1].backpageString);
        setCardNr(cardNr - 1)
    } 

    function updateCards() {
        let card: CardDto = {
            cardNumber: cardNr,
            frontpageString: frontPage,
            frontpagePicture: "",
            backpageString: backPage,
            backpagePicture: ""
        }
        let newCards = cards;
        newCards[cardNr] = card;
        setCards(newCards);
    }

    async function handleSave() {
        updateCards();

        let deck: DeckDto = {
            deckId: oldDeck.deckId,
            deckName: deckName,
            cardList: cards,
            visibility: visibility,
            category: category,
        }

        await requests.updateDeck(deck);

        await reloadProfile();

        window.location.href = "/mydecks";
    }

    function handleBack(){
        window.location.href = "/mydecks";
    }



    return (<div>
        <Box sx={{alignItems: "center", display: "flex", flexDirection: "row"}}>
            <Box sx={{flex: 0.2, alignItems: "center", display: "flex", flexDirection: "column"}}>
                <TextField id="outlined-basic" label="Tittel på sett" value={deckName} onChange={(e) => {setDeckName(e.target.value)}} variant="outlined" sx={{margin: "2rem", width: 400}} />

                <Typography
                    variant="h5"
                    component="div"
                    sx={{textDecoration: "underline", marginLeft: "1rem", marginTop: "1rem", fontSize: "1.5rem"}}
                >
                    Synlighet:
                </Typography>
                <RadioGroup
                    row
                    aria-label="synlighet"
                    name="synlighet"
                    value={visibility}
                    onChange={(e) => {setVisbility(!visibility)}}
                >
                    <FormControlLabel value={true} control={<Radio />} label="offentlig" />
                    <FormControlLabel value={false} control={<Radio />} label="privat" />
                </RadioGroup>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{textDecoration: "underline", marginLeft: "1rem", marginTop: "1rem", fontSize: "1.5rem"}}
                >
                    Kategori:
                </Typography>
                <RadioGroup
                    aria-label="category"
                    name="category"
                    value={category}
                    onChange={(e) => {setCategory(e.target.value)}}
                >
                    {categories.map(c => (
                        <FormControlLabel value={c} control={<Radio />} label={c} />
                    ))}
                </RadioGroup>
                <Button variant="outlined" size="large" onClick={handleSave} sx={{margin: "1rem"}}>
                    Lagre Sett
                </Button>
                <Button variant="outlined" size="large" onClick={handleBack}>
                    Avbryt
                </Button>
            </Box>
            <Box sx={{flex: 1, alignItems: "center", display: "flex", flexDirection: "row"}}>
                <Box sx={{flex: 1, alignItems: "center", display: "flex", flexDirection: "column"}}>
                    <CircularButton content="Forrige Kort" onClick={prevCard}/>
                </Box>
                

                <Box sx={{alignItems: "center", display: "flex", flexDirection: "column"}}>
                    
                    
                    <Card
                    sx={{
                    maxWidth: 400,
                    margin: "1rem",
                    marginLeft: "1.5rem",
                    border: "1px solid #ccc",
                    maxHeight: 250,
                    }}
                    >
                        <CardContent>
                            <Typography
                            variant="h5"
                            component="div"
                            sx={{
                            textDecoration: "underline",
                            marginLeft: "1rem",
                            marginTop: "1rem",
                            fontSize: "1.5rem",
                            }}
                            >
                                Forside
                            </Typography>
                            <TextField
                                id="outlined-basic" label="skriv spørsmål her" value={frontPage} onChange={(e) => {setFrontPage(e.target.value)}} multiline rows={3} variant="outlined" sx={{margin: "2rem", width: 300}}/>  <br/>
                        </CardContent>
                    </Card>

                    <Card
                    sx={{
                    maxWidth: 400,
                    margin: "1rem",
                    marginLeft: "1.5rem",
                    border: "1px solid #ccc",
                    maxHeight: 250,
                    }}
                    >
                    <CardContent>
                        <Typography
                        variant="h5"
                        component="div"
                        sx={{
                        textDecoration: "underline",
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        fontSize: "1.5rem",
                        }}
                    >
                        Bakside
                    </Typography>
                        <TextField
                            id="outlined-basic" label="skriv svar her" value={backPage} onChange={(e) => {setBackPage(e.target.value)}} multiline rows={3} variant="outlined" sx={{margin: "2rem", width: 300}}/>  <br/>
                    </CardContent>
                    </Card>

                    <Typography
                            variant="h5"
                            component="div"
                            sx={{
                            marginLeft: "1rem",
                            marginTop: "1rem",
                            fontSize: "1.5rem",
                            }}
                        >
                            Kort nr. {cardNr + 1}
                    </Typography>
                    
                </Box>
            

                
                <Box sx={{flex: 1, alignItems: "center", display: "flex", flexDirection: "column"}}>
                    <CircularButton content="Neste Kort" onClick={nextCard}/>
                </Box>

            </Box>
        </Box>
    </div>
        
    )
}