import { Box, Grid, TextField, Typography } from "@mui/material";
import { getProfile } from "../utils/LocalStorage/profile";
import { useState } from "react";
import { DeckDto } from "../utils/dto/DeckDto";

export function SearchAndFilterArea(props: {itemPadding: string, filterWidth: number, setDecks: any}) {
    
    // Bruk `setDecks` til å oppdatere hvilke decks som vises i browsing-siden :)
    const setDecks = props.setDecks;
    
    // Når API-endepunktet er definert, må denne oppdateres for å få inn alle relevante decks.
    const [alldecks, setAllDecks] = useState<DeckDto[]>( getProfile().ownedDecks );


    const search = (searchWord: string) => {

        const foundDecks: DeckDto[] = [];

        for (var deck of alldecks) {

            if (deck.deckName.toLowerCase().startsWith(searchWord.toLowerCase())) {

                foundDecks.push(deck);

            }
        }

        setDecks(foundDecks);
        
    }
    
    return (
        
        <Grid item xs={props.filterWidth} padding={props.itemPadding}>
            
            <Box borderRadius={props.itemPadding} bgcolor={"lightgray"}>
                
                <Grid container direction={"column"}>
                    
                    {/* Du kan lage <Grid item> ... </Grid> inni her for å legge til ting, se eksempelet nedenfor som legger til en overskrift :) */}
                    
                    <Grid item padding={props.itemPadding}>
                        <Typography variant="h5">
                            Søk & Filtrer
                        </Typography>
                    </Grid>
                    
                    {/* Her kan det legges til flere elementer. De havner under hverandre. */}
                    <Grid item padding={props.itemPadding}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            //value={searchWord} // Oppdater til å bruke 'name' som verdi
                            label={"Search"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                search(event.target.value);
                            }}
                            sx={{ margin: '2rem' }}
                        />
                    </Grid>
                    
                    
                </Grid>
                
            </Box>
            
        </Grid>
        
    )
    
}
