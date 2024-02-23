"use client";

import { Button, Grid, Container, Card, Typography, Box, TextField } from "@mui/material";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { DeckDto } from "../utils/dto/DeckDto";
import { requests } from "../utils/Api/requests";
import { getProfile } from "../utils/LocalStorage/profile";
import { BrowseArea } from "./BrowseArea";
import { SearchAndFilterArea } from "./SearchAndFilterArea";

export default function BrowsePage() {
    
    const [decks, setDecks] = useState<DeckDto[]>( getProfile().ownedDecks );
    
    const filterWidth = 3;
    const browseWidth = 12 - filterWidth;
    const itemPadding = "10px";
    
    return <div>
        
        <Navbar selected={0} />
        
        <Container>
                
            <Grid container direction={"row"}>
                
                <SearchAndFilterArea itemPadding={itemPadding} filterWidth={filterWidth} setDecks={setDecks} />
                
                <BrowseArea decks={decks} browseWidth={browseWidth} itemPadding={itemPadding} />
                
            </Grid>
            
        </Container>
        
    </div>
    
}