import { Button, Card, Grid, Typography } from "@mui/material";
import { DeckDto } from "../utils/dto/DeckDto";


export function BrowseArea(props: {decks: DeckDto[], browseWidth: number, itemPadding: string}) {
    
    return <Grid container item xs={props.browseWidth} spacing="20px">
        {props.decks.map( deck => <DeckCard deck={deck} itemPadding={props.itemPadding} key={deck.deckId} /> )}
    </Grid>
    
}


function DeckCard(props: {deck: DeckDto, itemPadding: string}) {
    
    return (
        <Grid item padding={props.itemPadding} xs={12} sm={6} md={6} lg={4}>
            <Button sx={{width: "100%"}} onClick={ () => { window.location.href = `/flipcard/${props.deck.deckId}` } }>
                
                <Grid container direction={"column"} spacing="10px">
                    
                    <Grid item>
                        <Card sx={{padding: props.itemPadding, width: "100%"}}>
                            <Grid container direction={"column"} spacing={props.itemPadding}>
                                
                                <Grid item>
                                    <Typography variant="h6">
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
                    </Grid>
                    
                    <Grid item container direction={"row"}>
                        
                        {/* Change these when the API gets updated. */}
                        
                        <Grid item xs={8}>
                            <Typography variant="body1" textAlign={"left"} color="gray">
                                Brukernavn ...
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={4}>
                            <Typography variant="body1" textAlign={"right"} color="red">
                                0 likes
                            </Typography>
                        </Grid>
                        
                    </Grid>
                    
                </Grid>
                
            </Button>
        </Grid>
    )
}
