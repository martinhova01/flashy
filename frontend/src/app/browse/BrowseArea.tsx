import { Card, Grid, Typography } from "@mui/material";
import { DeckDto } from "../utils/dto/DeckDto";

export function BrowseArea(props: {decks: DeckDto[], browseWidth: number, itemPadding: string}) {
    
    const decks = props.decks;
    const itemPadding = props.itemPadding;
    const browseWidth = props.browseWidth;
    
    return <Grid container item xs={browseWidth} sm={browseWidth} md={browseWidth} lg={browseWidth} direction={"column"}>
        {decks.map( deck => 
            <Grid item padding={itemPadding}>
                <Card sx={{padding: itemPadding}}>
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
    
    
}