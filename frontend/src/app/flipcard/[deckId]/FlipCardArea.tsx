import { Button, Grid, LinearProgress } from "@mui/material";
import FlipCardComponent from "./FlipCardComponent";

export default function FlipCardArea(progress: any, isFlipped: any, handleFlip: any, cards: any, card: any, handleHard: any, handleNextCard: any, handleShuffleOnly: any, handleResetOrder: any) {
    
    return (
        <Grid 
          item xs= {12}
          md={7}
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignContent: "center", 
            justifyContent: "center" }}
        >
            
            <LinearProgress 
                variant="determinate" 
                value={progress}
                style={{ width: "35rem"}}  
            />
            
            { FlipCardComponent(isFlipped, handleFlip, cards, card) }
            
            <div>
            
                <Button
                    variant="outlined"
                    color="error"
                    style={{ margin: "1rem" }}
                    onClick={handleHard}
                >
                    Vanskelig
                </Button>

                <Button
                    variant="outlined"
                    color="success"
                    style={{ marginLeft: "1rem" }}
                    onClick={handleNextCard}
                >
                    Lett
                </Button>

                <Button
                    variant="outlined"
                    style={{ margin: "1rem" }}
                    onClick={handleShuffleOnly}
                >
                    Stokk kort
                </Button>

                <Button
                    variant="outlined"
                    style={{ margin: "1rem" }}
                    onClick={handleResetOrder}
                >
                    Tilbakestill rekkefølge
                </Button>
                
            </div>
          
        </Grid>

    );
    
}