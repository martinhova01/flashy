"use client";

import { Grid, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { DeckDto } from "../utils/dto/DeckDto";
import { getProfile } from "../utils/LocalStorage/profile";
import { BrowseArea } from "./BrowseArea";
import { SearchAndFilterArea } from "./SearchAndFilterArea";

export default function BrowsePage() {
    
    // TODO: Akkurat nå starter vi med bare brukerens egne decks.
    // Når API-endepunktet er definert, må denne oppdateres for å få inn alle relevante decks.
    const [decks, setDecks] = useState<DeckDto[]>( getProfile().ownedDecks );
    
    const filterWidth = 3;
    const browseWidth = 12 - filterWidth;
    
    const itemPaddingNumber = 5;
    const itemPaddingString = `${itemPaddingNumber}px`;
    
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
                    
                    <SearchAndFilterArea itemPadding={itemPaddingString} filterWidth={filterWidth} setDecks={setDecks} />
                    
                    <BrowseArea decks={decks} browseWidth={browseWidth} itemPadding={itemPaddingString} />
                    
                </Grid>
                
            </Grid>
            
        </Container>
        
    </div>
    
}