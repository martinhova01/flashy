import { Box, Grid, Typography } from "@mui/material";

export function SearchAndFilterArea(props: {itemPadding: string, filterWidth: number, setDecks: any}) {
    
    // Bruk `setDecks` til å oppdatere hvilke decks som vises i browsing-siden :)
    const setDecks = props.setDecks;
    
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
                    
                </Grid>
                
            </Box>
            
        </Grid>
        
    )
    
}
