"use client";

import { Grid, Container, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { DeckDto } from "../utils/dto/DeckDto";
import { BrowseArea } from "./BrowseArea";
import { SearchAndFilterArea } from "./SearchAndFilterArea";
import { requests } from "../utils/Api/requests";
import { getProfile } from "../utils/LocalStorage/profile";
import DarkmodeSwitch from "../components/DarkmodeSwitch";

export default function BrowsePage() {
    
    //start med brukerens egne sett som dummy verdi
    const [decks, setDecks] = useState<DeckDto[]>(getProfile().ownedDecks);
    
    const filterWidth = 3;
    const browseWidth = 12 - filterWidth;
    
    const itemPaddingNumber = 5;
    const itemPaddingString = `${itemPaddingNumber}px`;


    const fetchDecks = async () => {
        try {
            const request = await requests.getAllPublicDecks();

            setDecks(request);
        } catch (error) {
            console.error("Error fetching decks:", error);
        }
    };
    
    useEffect(() => {
        fetchDecks();
    }, []);
    
    return <div>
        
        <Navbar selected={0} />
        
        <Container>
            
            <Grid container>
                
                <Grid item padding={`${itemPaddingNumber * 2}px`}>
                    <Typography variant="h3">
                        Finn populære sett
                    </Typography>
                </Grid>
                
                <Grid item container direction={"row"}>
                    
                    <SearchAndFilterArea itemPadding={itemPaddingString} filterWidth={filterWidth} decks={decks} setDecks={setDecks} />
                    
                    <BrowseArea decks={decks} browseWidth={browseWidth} itemPadding={itemPaddingString} />
                    
                </Grid>
                
            </Grid>
            
        </Container>
        <Box sx={{ position: 'fixed', right: 0, bottom: 0, p: 2 }}>
        <DarkmodeSwitch />
      </Box>
        
    </div>
    
}