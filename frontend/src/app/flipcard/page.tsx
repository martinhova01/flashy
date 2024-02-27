"use client";

import { Typography, Container, TextField, Grid, Box, Button, Card, CardContent} from "@mui/material";
import { transform } from "next/dist/build/swc";
import { useState } from "react";




export default function flashcard() {
    const[isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <Grid container justifyContent={"center"} alignItems={"center"} style={{height: "100vh"}}>
            <Grid item>
                <Card className={isFlipped ? "flipped" : ""} onClick={handleFlip} sx = {{ width: 500, height: 350, perspective: "1000px", position: "relative", transition: "transform 0.8s", transformStyle: "preserve-3d" , cursor: "pointer", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"}}>

                    <CardContent sx={{ height: "100%", width:"100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "absolute", backfaceVisibility: "hidden", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"}}>
                        <Typography variant="h5" component="h2">

                            Front side

                        </Typography>
                        
                    </CardContent>
                    
                    <CardContent sx={{ height: "100%", width: "100%" ,display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "absolute", backfaceVisibility: "hidden" ,transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)", }}>
                        <Typography variant="h5" component="h2">

                            back side

                        </Typography>
                        
                    </CardContent>
                </Card>

            </Grid>

        </Grid>

        

        
    )
    
}