import { Box, Button, ButtonGroup } from "@mui/material";
import Link from "next/link";
import React from "react";
import { logOut } from "../utils/localStorage/profile";

const AdminNavbar = (props: {selected: number}) => {
  
  // Legg til flere meny-elementer her
  const menuItems = [
    { text: "Brukere", link: "/admin/profiles", function: null},
    { text: "Offentlige dekk", link: "/admin/decks", function: null },
    { text: "Logg ut", link: "/", function: logOut },
  ]
  
  const reactElements = menuItems.map( item => {
    
    const onClick = (item.function == null) ? ( () => {} ) : ( item.function );
    const variant = (menuItems.indexOf(item) == props.selected) ? "contained" : "outlined";

    return (
      <Link href={item.link} key={item.text}>
        <Button onClick={onClick} variant={variant}>
          {item.text}
        </Button>
      </Link>
    )
    
  });
  
  return (
    <div>
      <Box padding={"10px"} sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
        <ButtonGroup aria-label="Large buttom group" size="large">
          {reactElements}
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default AdminNavbar;