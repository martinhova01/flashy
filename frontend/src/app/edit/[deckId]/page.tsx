"use client";
import React, { useEffect, useState } from "react";
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
import { reloadProfile } from "@/app/utils/LocalStorage/profile";
import { categoryNames } from "@/app/utils/dto/Categories";


export default function EditDeck({params} : {params: {deckId: number}}) {

    const [deckName, setDeckName]= useState<String>("");
    const [cardNr, setCardNr] = useState<number>(0);
    const [frontPage, setFrontPage] = useState<String>("");
    const [backPage, setBackPage] = useState<String>("");
    const [cards, setCards] = useState<CardDto[]>([]);
    const [visibility, setVisbility] = useState<boolean>(false);
    const [category, setCategory] = useState<String>("");

    const fetchDeck = async () => {
        try {
            const deck: DeckDto = await requests.getDeckByDeckId(Number(params.deckId));
        
            setCards(deck.cardList);
            setDeckName(deck.deckName);
            setFrontPage(deck.cardList[0].frontpageString);
            setBackPage(deck.cardList[0].backpageString);
            setVisbility(deck.visibility);
            setCategory(deck.category);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };
    
    useEffect(() => {
        fetchDeck();
    }, []);
    

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
            deckId: params.deckId,
            deckName: deckName,
            cardList: cards,
            visibility: visibility,
            category: category,
            likes: 0,
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
                    {categoryNames.map(c => (
                        <FormControlLabel key={c} value={c} control={<Radio />} label={c} />
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