import { Button, ButtonBase, Card, Grid, IconButton, Typography } from "@mui/material";
import { DeckDto } from "../utils/dto/DeckDto";
import { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { getProfile } from "@/app/utils/LocalStorage/profile";
import { yellow } from '@mui/material/colors';
import { requests } from "../utils/Api/requests";


export function BrowseArea(props: {decks: DeckDto[], browseWidth: number, itemPadding: string}) {
    
    return <Grid container item xs={props.browseWidth} spacing="20px">
        {props.decks.map( deck => <DeckCard deck={deck} itemPadding={props.itemPadding} key={deck.deckId} /> )}
    </Grid>

}


function DeckCard(props: {deck: DeckDto, itemPadding: string}) {   
    const [liked, setLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(0);
    const [favorited, setFavorited] = useState<boolean>(false);
    const [owner, setOwner] = useState<String>("");
    const profile = getProfile();

    const handleLikeClick = async (event: any) => {
        event.stopPropagation(); 
        const response: boolean = await requests.like(profile.profileId, props.deck.deckId);
        setLiked(response);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1); 
    };

    const handleFavoriteClick = async (event: any) => {
        event.stopPropagation();
        const response: boolean = await requests.favorite(profile.profileId, props.deck.deckId);
        setFavorited(response);
    };

    const fetch = async () => {
        try {
            setLikesCount(props.deck.likes);
            const fav: boolean = await requests.favoriteExists(profile.profileId, props.deck.deckId);
            setFavorited(fav);
            const like: boolean = await requests.likeExists(profile.profileId, props.deck.deckId);
            setLiked(like);
            const o: String = await requests.getOwner(props.deck.deckId);
            setOwner(o);
        } catch (error) {
            console.error("Error fetching favorite:", error);
        }
    };
    
    useEffect(() => {
        fetch();
    }, [props]);
    
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
                    
                    <Grid item container direction={"row"} alignContent={"center"} justifyContent={"space-between"} alignItems={"center"}>
                        
                        
                            <Typography variant="body1" textAlign={"left"} color="gray">
                                {owner}
                            </Typography>
                        
                            <Grid item>
                                <Typography variant="body2" sx={{ display: 'inline', marginRight: "8px" }}>
                                        {likesCount}
                                </Typography>

                                <IconButton onClick={handleLikeClick} color="inherit">
                                        {liked ? <FavoriteIcon color="error"/> : <FavoriteBorderIcon/>}
                                </IconButton>

                                <IconButton onClick={handleFavoriteClick} 
                                    sx={{ color: favorited ? yellow[700] : 'action.active'}}>
                                        {favorited ? <StarIcon/> : <StarBorderIcon/>}
                                </IconButton>
                            </Grid>
                        
                    </Grid>
                    
                </Grid>
                
            </Button>
        </Grid>
    )
}
