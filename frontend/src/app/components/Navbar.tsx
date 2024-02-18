import { Box, Button, ButtonGroup } from "@mui/material";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <Box
        sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="Large buttom group"
          size="large"
        >
          <Link href="/homepage">
            <Button>Flashy</Button>
          </Link>
          <Link href="/profile">
            <Button>Profil</Button>
          </Link>
          <Link href="/myfavories">
            <Button>Mine favoritter</Button>
          </Link>
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default Navbar;
