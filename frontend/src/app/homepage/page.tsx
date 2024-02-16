"use client";
import {
  Grid,
  Button,
  Typography,
  CardContent,
  Card,
  CardActions,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useAppContext } from "../Context/testContext";

const HomePage: React.FC = () => {
  const { name, setName } = useAppContext();

  const flashcardSets = [
    { id: 1, title: "Matte", description: "Flashcards for matteemner" },
    { id: 2, title: "Historie", description: "Flashcards for historieemner" },
    { id: 3, title: "Engelsk", description: "Flashcards for engelskemner" },
    { id: 4, title: "Matte", description: "Flashcards for matteemner" },
    { id: 5, title: "Historie", description: "Flashcards for historieemner" },
    { id: 6, title: "Engelsk", description: "Flashcards for engelskemner" },
    // Legg til flere flashcard-sett etter behov
  ];

  return (
    <div>
      <Navbar />

      <Grid
        container
        spacing={1}
        sx={{
          p: "2rem",
          m: "1rem",
        }}
      >
        {flashcardSets.map((flashcardSet) => (
          <Grid key={flashcardSet.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Button component="a" sx={{ m: "0rem", p: "0rem" }}>
                <CardContent>
                  <Typography variant="h6">{flashcardSet.title}</Typography>
                  <Typography variant="body2">
                    {flashcardSet.description}
                  </Typography>
                </CardContent>
              </Button>
              <CardActions>
                <Button
                  onClick={() => {
                    console.log(name);
                    setName("Roger");
                  }}
                >
                  Rediger
                </Button>
                <Button>Slett</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
