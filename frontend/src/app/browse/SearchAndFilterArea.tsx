import { Box, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DeckDto } from "../utils/dto/DeckDto";
import { requests } from "../utils/Api/requests";
import React from "react";
import { categoryNames } from "../utils/dto/Categories";

export function SearchAndFilterArea(props: {itemPadding: string, filterWidth: number, decks: DeckDto[], setDecks: any}) {
    
    const setDecks = props.setDecks;
    const [searchWord, setSearchWord] = useState<string>("");
    const [categories, setCategories] = useState<boolean[]>(new Array(categoryNames.length).fill(false));
    
    const search = async (searchWord: string, categories: boolean[]) => {
        if (props.decks === undefined) {
            return;
        }
        
        const allDecks = await requests.getAllPublicDecks();
        
        // Hvis søkeordet er tomt og ingen kategorier er valgt, vis alle dekkene
        if (searchWord === "" && categories.every(category => !category)) {
            await setDecks(allDecks);
            return;
        }
        
        const foundDecks: DeckDto[] = [];
        
        for (var deck of allDecks) {
            
            if (deck.deckName.toLowerCase().startsWith(searchWord.toLowerCase())) {
                
                const anyCategory = categories.every(category => !category);
                
                let isChecked = false;
                
                for (let index = 0; index < categories.length; index++) {
                    
                    if (deck.category === categoryNames[index]) {
                        isChecked = categories[index];
                    }
                    
                }
                
                if (anyCategory || isChecked) {
                    foundDecks.push(deck);
                }
                
            }
            
        }
    
        await setDecks(foundDecks);
    }
    

    const resetAllDecks = async () => {
        try {
            const request = await requests.getAllPublicDecks();
            setDecks(request);
        } catch (error) {
            console.error("Error fetching decks:", error);
        }
    };

    useEffect(() => {
        resetAllDecks();
    }, []);

    const handleCategoryChange = async (index: number, value: boolean) => {
        
        const updatedCategories = [...categories];
        updatedCategories[index] = value;
        setCategories(updatedCategories);
        
        await search(searchWord, updatedCategories);
        
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
                            {categoryNames.map((category, index) => (
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
