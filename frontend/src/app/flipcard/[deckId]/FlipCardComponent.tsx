import { Card, CardContent, Typography } from "@mui/material";
import ReactCardFlip from "react-card-flip";

export default function FlipCardComponent(isFlipped: any, handleFlip: any, cards: any, card: any) {
    
    return (
        
        <ReactCardFlip
        flipDirection="horizontal" 
        isFlipped={isFlipped}>

        <Card
          className={"card"} 
          onClick={handleFlip}
          style={{ 
            width: "35rem", 
            height: "25rem", 
            marginBottom: "1rem"}}>
          <CardContent
            sx={{
              width: "35rem",
              height: "25rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="h2">
              {cards && cards.length > 0
                ? cards[card]!.frontpageString
                : "Loading"}
            </Typography>

          </CardContent>
        </Card>

        <Card 
          className="card card-back" 
          onClick={handleFlip}
          style={{
            width: "35rem",
            height: "25rem",
            marginBottom: "1rem"
          }}
          >
          <CardContent
            sx={{
              width: "35rem",
              height: "25rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="h2">
              {cards && cards.length > 0
                ? cards[card]!.backpageString
                : "Loading"}
            </Typography>
          </CardContent>
        </Card>
      </ReactCardFlip>

    )
    
}