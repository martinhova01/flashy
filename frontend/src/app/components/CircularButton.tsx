import { Button } from "@mui/material";


export default function CircularButton(props: any) {
    return (
    <Button variant="outlined" onClick={props.onClick} size="small" sx={{borderRadius: "50%", width: "100px", height: "100px"}}>
        {props.content}
    </Button>
    )
}