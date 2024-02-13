import { CardDto } from "./CardDto";


export type DeckDto = {
    deckId: number;
    name: String;
    cards: CardDto[];
}