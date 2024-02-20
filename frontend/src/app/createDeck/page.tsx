"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import CircularButton from "../components/CircularButton";
import { CardDto } from "../utils/dto/CardDto";
import { DeckDto } from "../utils/dto/DeckDto";
import { requests } from "../utils/Api/requests";
import { ProfileDto } from "../utils/dto/ProfileDto";

export default function createDeck() {

    let [deckName, setDeckName]= useState<String>("");
    let [cardNr, setCardNr] = useState<number>(1);
    let [frontPage, setFrontPage] = useState<String>("");
    let [backPage, setBackPage] = useState<String>("");
    let cardList: CardDto[] = [];

    const profile: ProfileDto = JSON.parse(localStorage.getItem("profile")!);
    

    function nextCard() {
        let card: CardDto = {
            cardNumber: 0,
            frontpageString: frontPage,
            frontpagePicture: "",
            backpageString: backPage,
            backpagePicture: ""
        }

        if (cardNr - 1 === cardList.length) {
            cardList.push(card)
        }
        else{
            cardList[cardNr - 1] = card;
        }
        setCardNr(cardNr + 1)
    }

    function prevCard() {
        let card: CardDto = {
            cardNumber: 0,
            frontpageString: frontPage,
            frontpagePicture: "",
            backpageString: backPage,
            backpagePicture: ""
        }
        if (cardNr === 1) {
            return;
        }
        cardList[cardNr - 1] = card;
        setCardNr(cardNr - 1)
    } 

    async function handleSave() {
        let deck: DeckDto = {
            deckId: 0,
            deckName: deckName,
            cardList: cardList
        }

        console.log(deck);
        // await requests.addNewDeck(deck, profile.profileId);

        // window.location.href = "/homepage";
    }



    return (<div>
        <Navbar />
        <Box sx={{alignItems: "center", display: "flex", flexDirection: "row"}}>
            <Box sx={{flex: 0.2, alignItems: "center", display: "flex", flexDirection: "column"}}>
                <TextField id="outlined-basic" label="Tittel på sett" variant="outlined" sx={{margin: "2rem", width: 400}}/>

                <Button variant="outlined" size="large" onClick={handleSave}>
                    Lagre Sett
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
                                id="outlined-basic" label="skriv spørsmål her" multiline rows={3} variant="outlined" sx={{margin: "2rem", width: 300}}/>  <br/>
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
                            id="outlined-basic" label="skriv svar her" multiline rows={3} variant="outlined" sx={{margin: "2rem", width: 300}}/>  <br/>
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
                            Kort nr. {cardNr}
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