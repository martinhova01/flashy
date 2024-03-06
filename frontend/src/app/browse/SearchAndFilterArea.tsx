import { Box, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DeckDto } from "../utils/dto/DeckDto";
import { requests } from "../utils/Api/requests";
import React from "react";
import { debug } from "console";

export function SearchAndFilterArea(props: {itemPadding: string, filterWidth: number, decks: DeckDto[], setDecks: any}) {

    
    // Bruk `setDecks` til å oppdatere hvilke decks som vises i browsing-siden :)
    const setDecks = props.setDecks;
    const decks = props.decks;
    const [alldecks, setAllDecks] = useState<DeckDto[]>();
    const [searchWord, setSearchWord] = useState<String>();

    const search = async () => {
        
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

            if ( searchWord != undefined && (deck.deckName.toLowerCase().startsWith(searchWord.toLowerCase()))) {

                foundDecks.push(deck);
            }
        }

        await setDecks(foundDecks);
        
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




        const [checkedFavourites, setCheckedFavourites] = React.useState(false);
        const changeFavourites = (event: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedFavourites(event.target.checked);
              search();
        }

        const [checkedKunstogMusikk, setCheckedKunstogMusikk] = React.useState(false);
        const changeKunstogMusikk = (event: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedKunstogMusikk(event.target.checked);
        }

        const [checkedHistorieogReliogon, setCheckedHistorieogReligion] = React.useState(false);
        const changeHistorieogReliogon = (event: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedHistorieogReligion(event.target.checked);
        }

        const [checkedIT, setCheckedIT] = React.useState(false);
        const changeIT = (event: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedIT(event.target.checked);
        }

        const [checkedMatteogNatur, setCheckedMatteogNatur] = React.useState(false);
        const changeMatteogNatur = (event: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedMatteogNatur(event.target.checked);
        }

        const [checkedMedisin, setCheckedMedisin] = React.useState(false);
        const changeMedisin = (event: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedMedisin(event.target.checked);
        }

        const [checkedSamfunnsfag, setCheckedSamfunnsfag] = React.useState(false);
        const changeSamfunnsfag = (event: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedSamfunnsfag(event.target.checked);
        }

        const [checkedSprak, setCheckedSprak] = React.useState(false);
        const changeSprak = (event: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedSprak(event.target.checked);
        }

        const [checkedOkonomi, setCheckedOkonomi] = React.useState(false);
        const changeOkonmi = (event: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedOkonomi(event.target.checked);
        }

        const [checkedAnnet, setCheckedAnnet] = React.useState(false);
        const changeAnnet = (event: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedAnnet(event.target.checked);
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
                                setSearchWord(event.target.value);
                                search();
                            }}
                            sx={{ margin: '2rem' }}
                        />

                        <FormGroup sx={{marginLeft: "2rem"}}>
                            <FormControlLabel control={<Checkbox checked={checkedFavourites} 
                            onChange={changeFavourites}/>} label="Mine favoritter" />

                            <FormControlLabel control={<Checkbox checked={checkedKunstogMusikk} 
                            onChange={changeKunstogMusikk}/>} label="Kunst og Musikk" />

                            <FormControlLabel control={<Checkbox checked={checkedHistorieogReliogon} 
                            onChange={changeHistorieogReliogon}/>} label="Historie og Religion" />

                            <FormControlLabel control={<Checkbox checked={checkedIT} 
                            onChange={changeIT}/>} label="IT" />
                            
                            <FormControlLabel control={<Checkbox checked={checkedMatteogNatur} 
                            onChange={changeMatteogNatur}/>} label="Matematikk og Naturfag" />

                            <FormControlLabel control={<Checkbox checked={checkedMedisin} 
                            onChange={changeMedisin}/>} label="Medisin og Helse" />

                            <FormControlLabel control={<Checkbox checked={checkedSamfunnsfag} 
                            onChange={changeSamfunnsfag}/>} label="Samfunnsfag" />

                            <FormControlLabel control={<Checkbox checked={checkedSprak} 
                            onChange={changeSprak}/>} label="Språk og Litteratur" />

                            <FormControlLabel control={<Checkbox checked={checkedOkonomi} 
                            onChange={changeOkonmi}/>} label="Økonomi" />

                            <FormControlLabel control={<Checkbox checked={checkedAnnet} 
                            onChange={changeAnnet}/>} label="Annet" />
                        </FormGroup>
                    </Grid>
                    
                    
                </Grid>
                
            </Box>
            
        </Grid>
        
    )
    
}
