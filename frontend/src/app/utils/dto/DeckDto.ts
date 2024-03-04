import { CardDto } from "./CardDto";


export type DeckDto = {
    deckId: number;
    deckName: String;
    cardList: CardDto[];
    visibility: boolean;
    category: String;
}