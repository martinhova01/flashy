import { Box, Button, ButtonGroup } from "@mui/material";
import Link from "next/link";
import React from "react";

const Navbar = (props: {selected: number}) => {
  
  // Legg til flere meny-elementer her
  const menuItems = [
    { text: "Flashy", link: "/homepage" },
    { text: "Profil", link: "/profile" },
    { text: "Favoritter", link: "/favourites" },
    { text: "Logg ut", link: "/"},
  ]
  
  const reactElements = menuItems.map( item => {
    
    const variant = (menuItems.indexOf(item) == props.selected) ? "contained" : "outlined";
    
    return (
      <Link href={item.link}>
        <Button variant={variant}>
          {item.text}
        </Button>
      </Link>
    )
    
  });
  
  return (
    <div>
      <Box
        sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}
      >
        <ButtonGroup
          aria-label="Large buttom group"
          size="large"
          sx={{marginTop: "1rem"}}
        >
          {reactElements}
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default Navbar;
