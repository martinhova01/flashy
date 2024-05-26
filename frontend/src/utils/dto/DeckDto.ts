import { CardDto } from "./CardDto";


export type DeckDto = {
    deckId: number;
    deckName: String;
    cardList: CardDto[];
    visibility: number;
    category: String;
    likes: number;
}