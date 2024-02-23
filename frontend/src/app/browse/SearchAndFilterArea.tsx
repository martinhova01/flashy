import { Box, Grid, TextField, Typography } from "@mui/material";

export function SearchAndFilterArea(props: {itemPadding: string, filterWidth: number, setDecks: any}) {
    
    // Bruk `setDecks` til å oppdatere hvilke decks som vises i browsing-siden :)
    const setDecks = props.setDecks;
    
    const itemPadding = props.itemPadding;
    const filterWidth = props.filterWidth;
    
    return <Grid item xs={filterWidth} sm={filterWidth} md={filterWidth} lg={filterWidth} padding={itemPadding}>
        
        <Box borderRadius={itemPadding} bgcolor={"lightgray"}>
            
            <Grid container direction={"column"}>
                
                {/* Du kan lage <Grid item> ... </Grid> inni her for å legge til ting, se eksempelet nedenfor som legger til en overskrift :) */}
                
                <Grid item padding={itemPadding}>
                    <Typography variant="h5">
                        Søk & Filtrer
                    </Typography>
                </Grid>
                
                {/* Her kan det legges til flere elementer. De havner under hverandre. */}
                
            </Grid>
            
        </Box>
        
    </Grid>
    
}
