"use client";

import { Typography, Container, TextField, Grid, Box, Button, Card, CardContent} from "@mui/material";
import { transform } from "next/dist/build/swc";
import { useState } from "react";
import ReactCardFlip from 'react-card-flip';




export default function flashcard() {
    const[isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <Grid container justifyContent={"center"} alignItems={"center"} style={{height: "100vh"}}>
            <Grid item>
                <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>

                
                <Card className={"card"} onClick={handleFlip} >

                    <CardContent sx={{width:"35rem" , height:"25rem", display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <Typography variant="h5" component="h2">

                            Front side

                        </Typography>
                        
                    </CardContent>
                        
                    </Card>
                    
                    <Card className="card card-back" onClick={handleFlip}>
                    <CardContent sx={{width:"35rem" , height:"25rem", display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <Typography variant="h5" component="h2">

                            back side

                        </Typography>
                        
                    </CardContent>
                </Card>
                </ReactCardFlip>
            </Grid>

        </Grid>

        

        
    )
    
}