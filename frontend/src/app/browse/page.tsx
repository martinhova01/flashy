"use client";

import { Button, Grid, Container, Card, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { DeckDto } from "../utils/dto/DeckDto";
import { requests } from "../utils/Api/requests";
import { getProfile } from "../utils/LocalStorage/profile";

export default function BrowsePage() {
    
    const [decks, setDecks] = useState<DeckDto[]>( getProfile().ownedDecks );
    
    const filterWidth = 3;
    const browseWidth = 12 - filterWidth;
    
    return <div>
        
        <Navbar selected={0} />
        
        <Container>
                
            <Grid container direction={"row"}>
                
                {/* Filter column */}
                <Grid item xs={filterWidth} sm={filterWidth} md={filterWidth} lg={filterWidth} bgcolor={"black"}>
                    
                    <Button>
                        ABC
                    </Button>
                    
                </Grid>
                
                {/* Browsing area */}
                <Grid 
                    container 
                    item 
                    xs={browseWidth} sm={browseWidth} md={browseWidth} lg={browseWidth} 
                    direction={"column"}
                >
                    {decks.map( deck => 
                        <Grid item>
                            <Card>
                                <Typography variant="h5">
                                    {deck.deckName}
                                </Typography>
                                <Typography variant="body1">
                                    {deck.cardList.length} kort
                                </Typography>
                            </Card>
                        </Grid>
                    )}
                </Grid>
                
            </Grid>
            
        </Container>
        
    </div>
    
}