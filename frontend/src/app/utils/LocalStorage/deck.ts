import { requests } from "../Api/requests";
import { DeckDto } from "../dto/DeckDto";

// Gets all public decks from the database.
export function getPublicDecks(): DeckDto[] {
    return JSON.parse(localStorage.getItem("decks")!) as DeckDto[]
}
