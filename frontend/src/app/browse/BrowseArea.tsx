import { Button, ButtonBase, Card, Grid, Typography } from "@mui/material";
import { DeckDto } from "../utils/dto/DeckDto";
import Link from "next/link";

export function BrowseArea(props: {decks: DeckDto[], browseWidth: number, itemPadding: string}) {
    
    const browseWidth = props.browseWidth;
    
    return <Grid container item xs={browseWidth} sm={browseWidth} md={browseWidth} lg={browseWidth} direction={"column"}>
        {props.decks.map( deck => <DeckCard deck={deck} itemPadding={props.itemPadding} /> )}
    </Grid>
    
}

function DeckCard(props: {deck: DeckDto, itemPadding: string}) {
    
    return (
        <Grid item padding={props.itemPadding}>
            <Button sx={{width: "100%"}} onClick={ () => { window.location.href = `/view/${props.deck.deckId}` } }>
                <Card sx={{padding: props.itemPadding, width: "100%"}}>
                    <Grid container direction={"column"} spacing={"10px"}>
                        
                        <Grid item>
                            <Typography variant="h5">
                                {props.deck.deckName}
                            </Typography>
                        </Grid>
                        
                        <Grid item>
                            <Typography variant="body1">
                                {props.deck.cardList.length} kort
                            </Typography>
                        </Grid>
                        
                    </Grid>
                </Card>
            </Button>
        </Grid>
    )
}
