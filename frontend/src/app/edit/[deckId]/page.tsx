/* page.tsx */
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

import DarkmodeSwitch from "@/app/components/DarkmodeSwitch";
import './styles.css'; 

    const [deckName, setDeckName]= useState<String>("");
    const [cardNr, setCardNr] = useState<number>(0);
    const [frontPage, setFrontPage] = useState<String>("");
    const [backPage, setBackPage] = useState<String>("");
    const [cards, setCards] = useState<CardDto[]>([]);
    const [visibility, setVisbility] = useState<number>(0);
    const [category, setCategory] = useState<String>("");
    const [frontBaseImage, setFrontBaseImage] = useState<string>("");
    const [backBaseImage, setBackBaseImage] = useState<string>();

    const fetchDeck = async () => {
        try {
            const deck: DeckDto = await requests.getDeckByDeckId(Number(params.deckId));
        
            setCards(deck.cardList);
            setDeckName(deck.deckName);
            setFrontPage(deck.cardList[0].frontpageString);
            setBackPage(deck.cardList[0].backpageString);
            setFrontBaseImage(deck.cardList[0].frontpagePicture);
            setBackBaseImage(deck.cardList[0].backpagePicture);
            setVisbility(deck.visibility);
            setCategory(deck.category);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };
    
    useEffect(() => {
        fetchDeck();
    }, []);
    const uploadFrontImage = async (e: any) => {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      if (typeof base64 === "string") {
        setFrontBaseImage(base64);
      }
      console.log(frontBaseImage);
    };
    const uploadBackImage = async (e: any) => {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      if (typeof base64 === "string") {
        setBackBaseImage(base64);
      }
      console.log(backBaseImage);
    };
  
    const convertBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
  
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };
    

  function nextCard() {
    updateCards();
    if (cardNr + 1 == cards.length) {
      setFrontPage("");
      setBackPage("");
      setBackBaseImage("");
      setFrontBaseImage("");
    } else {
      setFrontPage(cards[cardNr + 1].frontpageString);
      setBackPage(cards[cardNr + 1].backpageString);
      setBackBaseImage(`${cards[cardNr + 1].backpagePicture}`);
      setFrontBaseImage(`${cards[cardNr + 1].frontpagePicture}`);
    }
    setCardNr(cardNr + 1);
  }

  function prevCard() {
    updateCards();
    if (cardNr == 0) {
      return;
    }
    setFrontPage(cards[cardNr - 1].frontpageString);
    setBackPage(cards[cardNr - 1].backpageString);
    setCardNr(cardNr - 1);
  }

  function updateCards() {
    let card: CardDto = {
      cardNumber: cardNr,
      frontpageString: frontPage.toString(),
      frontpagePicture: frontBaseImage,
      backpageString: backPage.toString(),
      backpagePicture: backBaseImage,
    };
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
    };

    await requests.updateDeck(deck);

    await reloadProfile();

    window.location.href = "/mydecks";
  }

    function handleVisibility(event: any) {
        setVisbility(event.target.value);
    }

  function handleBack() {
    window.location.href = "/mydecks";
  }

  return (
    <div>
      <Box sx={{ alignItems: "center", display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            flex: 0.2,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Tittel på sett"
            value={deckName}
            onChange={(e) => {
              setDeckName(e.target.value);
            }}
            variant="outlined"
            sx={{ margin: "2rem", width: 400 }}
          />

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
            Synlighet:
          </Typography>
          <RadioGroup
            row
            aria-label="synlighet"
            name="synlighet"
            value={visibility}
            onChange={handleVisibility}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="offentlig"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="privat"
            />
          </RadioGroup>
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
            Kategori:
          </Typography>
          <RadioGroup
            aria-label="category"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {categories.map((c) => (
              <FormControlLabel value={c} control={<Radio />} label={c} />
            ))}
          </RadioGroup>
          <Button
            variant="outlined"
            size="large"
            onClick={handleSave}
            sx={{ margin: "1rem" }}
          >
            Lagre Sett
          </Button>
          <Button variant="outlined" size="large" onClick={handleBack}>
            Avbryt
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              flex: 1,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CircularButton content="Forrige Kort" onClick={prevCard} />
          </Box>

          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card
              sx={{
                maxWidth: 500,
                margin: "1rem",
                marginLeft: "1.5rem",
                border: "1px solid #ccc",
                maxHeight: 350,
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
                <div className="App">
                  <input
                    type="file"
                    onChange={(e) => {
                      uploadFrontImage(e);
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => setFrontBaseImage('')}
                    sx={{ mt: 1 }}
                    size="small"
                  >
                    Slett Bilde
                  </Button>
                  <br></br>
                  <img src={frontBaseImage} className="image-fit" />
                  
                </div>
                <TextField
                  id="outlined-basic"
                  label="skriv spørsmål her"
                  value={frontPage}
                  onChange={(e) => {
                    setFrontPage(e.target.value);
                  }}
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={{ margin: "2rem", width: 300 }}
                />{" "}
                <br />
              </CardContent>
            </Card>

            <Card
              sx={{
                maxWidth: 500,
                margin: "1rem",
                marginLeft: "1.5rem",
                border: "1px solid #ccc",
                maxHeight: 350,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    textDecoration: "underline",
                    marginLeft: "1rem",
                    marginTop: "0rem",
                    fontSize: "1.5rem",
                  }}
                >
                  Bakside
                </Typography>
                <div className="App">
                  <input
                    type="file"
                    onChange={(e) => {
                      uploadBackImage(e);
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => setBackBaseImage('')}
                    sx={{ mt: 1 }}
                    size="small"
                  >
                    Slett Bilde
                  </Button>
                  <img src={backBaseImage} className="image-fit" />
                  
                </div>
                <TextField
                  id="outlined-basic"
                  label="skriv svar her"
                  value={backPage}
                  onChange={(e) => {
                    setBackPage(e.target.value);
                  }}
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={{ margin: "2rem", width: 300 }}
                />{" "}
                <br />
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

          <Box
            sx={{
              flex: 1,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CircularButton content="Neste Kort" onClick={nextCard} />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
