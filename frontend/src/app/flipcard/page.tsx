"use client";

import { Typography, Grid, Card, CardContent, Button} from "@mui/material";
import { useState } from "react";
import ReactCardFlip from 'react-card-flip';
import Navbar from "../components/Navbar";




export default function flashcard() {
    const[isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    function handleBack() {
        window.location.href = "/homepage"
    };


    return (

        <Grid container>

            <Grid item>
                 <Button variant="outlined" style={{margin: "1rem"}} onClick={handleBack}>
                Tilbake
            </Button>
            </Grid>

           

            <Grid item marginTop={"1rem"}>
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

                <Button variant="outlined" color="error" style={{margin:"1rem"}}>
                    Vanskelig
                </Button>

                <Button variant="outlined" color="success" style={{marginLeft:"20rem"}}>
                    Lett
                </Button>

            </Grid>

        </Grid>

        

        

        
    )
    
}