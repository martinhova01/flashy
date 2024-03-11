import { Box, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DeckDto } from "../utils/dto/DeckDto";
import { requests } from "../utils/Api/requests";
import React from "react";

export function SearchAndFilterArea(props: {itemPadding: string, filterWidth: number, decks: DeckDto[], setDecks: any}) {
    const setDecks = props.setDecks;
    const decks = props.decks;
    const [alldecks, setAllDecks] = useState<DeckDto[]>();
    const [searchWord, setSearchWord] = useState<string>("");
    const [categories, setCategories] = useState<boolean[]>(new Array(9).fill(false)); // Endret til 9 da vi har fjernet en kategori


    const search = async (searchWord: string, categories: boolean[]) => {
        if (alldecks === undefined) {
            return;
        }
    
        // Hvis søkeordet er tomt og ingen kategorier er valgt, vis alle dekkene
        if (searchWord === "" && categories.every(category => !category)) {
            await setDecks(alldecks);
            return;
        }
    
        const foundDecks: DeckDto[] = [];
    
        for (var deck of alldecks) {
            if (searchWord !== "" && deck.deckName.toLowerCase().startsWith(searchWord.toLowerCase())) {
                if (categories.every((value, index) => value === false || (value === true && deck.category[index]))) {
                    foundDecks.push(deck);
                }
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

    const handleCategoryChange = (index: number, value: boolean) => {
        const updatedCategories = [...categories];
        updatedCategories[index] = value;
        setCategories(updatedCategories);

        if (searchWord !== "") {
            search(searchWord, updatedCategories);
        }
    }

    return (
        <Grid item xs={props.filterWidth} padding={props.itemPadding}>
            <Box borderRadius={props.itemPadding} bgcolor={"lightgray"}>
                <Grid container direction={"column"}>
                    <Grid item padding={props.itemPadding}>
                        <Typography variant="h5">Søk & Filtrer</Typography>
                    </Grid>
                    <Grid item padding={props.itemPadding}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label={"Search"}
                            value={searchWord}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setSearchWord(event.target.value);
                                search(event.target.value, categories);
                            }}
                            sx={{ margin: '2rem' }}
                        />
                        <FormGroup sx={{marginLeft: "2rem"}}>
                            {["Kunst og Musikk", "Historie og Religion", "IT", "Matematikk og Naturfag", "Medisin og Helse", "Samfunnsfag", "Språk og Litteratur", "Økonomi", "Annet"].map((category, index) => (
                                <FormControlLabel 
                                    key={index}
                                    control={<Checkbox checked={categories[index]} onChange={(event) => handleCategoryChange(index, event.target.checked)}/>} 
                                    label={category} 
                                />
                            ))}
                        </FormGroup>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}
