import { CommentDto } from "@/app/utils/dto/CommentDto";
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";

export default function CommentSection(comment: any, handleCommentChange: any, handleAddComment: any, comments: CommentDto[], profile: any, sendCommentColor: any) {
    
    return (
        
        <Grid container item style={{paddingTop: "2rem"}} direction={"column"} md={5}>
            
            <Grid item md={1}>
                <Typography style={{ marginBottom: '1rem' }} fontSize={22}>
                    Kommentarer
                </Typography>
            </Grid>
            
            <Grid item md={7}>
                 
                <Paper
                    style={{
                        height: "30rem",
                        maxHeight: 300,
                        overflow: "auto",
                        width: "23rem"
                    }}
                >
                    <Grid container direction={"column"}>
                        {comments.map((comment: CommentDto, index: number) => (
                            <Box margin={"10px"}>
                                <Typography variant="body1" textAlign={"left"}>
                                    <strong>{comment.firstname + " " + comment.lastname}</strong>
                                </Typography>
                            
                                <Typography variant="body1" textAlign={"left"}>
                                    {comment.comment}
                                </Typography>
                            
                                {index < comments.length - 1 && <Divider variant="fullWidth" sx={{ paddingTop: "10px", paddingBottom: "10px" }} />}
                            </Box>
                        ))}
                    </Grid>
                    
                </Paper>
                
            </Grid>
            
            <Grid item container md={3} direction={"row"}>
                
                <Grid item md={9}>
                    <TextField
                        label="Legg til en kommentar"
                        variant="outlined"
                        value={comment}
                        multiline
                        rows={2}
                        fullWidth
                        onChange={handleCommentChange}
                        style={{
                        marginTop: "1rem",
                        width: "20rem",
                        }}
                    />
                </Grid>

                <Grid item style={{display: "flex", alignItems:"center"}} md={3} >
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{marginTop: "1rem"}}
                        onClick={handleAddComment}
                    >
                        Send
                    </Button>
                
                </Grid>
                
            </Grid>
              
        </Grid>
          
    );
    
}