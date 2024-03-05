import { Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DeckDto } from "../utils/dto/DeckDto";
import { requests } from "../utils/Api/requests";

export function SearchAndFilterArea(props: {itemPadding: string, filterWidth: number, decks: DeckDto[], setDecks: any}) {
    
    // Bruk `setDecks` til å oppdatere hvilke decks som vises i browsing-siden :)
    const setDecks = props.setDecks;
    const decks = props.decks;
    
    const [alldecks, setAllDecks] = useState<DeckDto[]>();


    const search = async (searchWord: string) => {
        
            //check if alldecks have been set
        if (alldecks == undefined) {
            return;
        }

        if (searchWord == "") {
            setDecks(alldecks)
            return;
        }

        const foundDecks: DeckDto[] = [];

        for (var deck of alldecks) {

            if (deck.deckName.toLowerCase().startsWith(searchWord.toLowerCase())) {

                foundDecks.push(deck);
            }
        }

        setDecks(foundDecks);
        
    }

    const resetAllDecks = async () => {
        try {
          const request = await requests.getAllPublicDecks();
    
          setAllDecks(request);
        } catch (error) {
          console.error("Error fetching decks:", error);
        }
      };

    useEffect(() => {
        resetAllDecks();
    }, []);
    
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
