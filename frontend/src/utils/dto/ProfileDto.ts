import { DeckDto } from "./DeckDto";


export type ProfileDto = {
    profileId: number;
    email: String;
    password: String;
    firstname: String;
    lastname: String;
    school: String;
    ownedDecks: DeckDto[];
    admin: boolean;
}