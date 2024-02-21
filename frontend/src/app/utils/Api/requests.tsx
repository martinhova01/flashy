import { DeckDto } from "../dto/DeckDto";
import { ProfileDto } from "../dto/ProfileDto";
import { api } from "./api";
import { AxiosResponse } from "axios";

export const requests = {
  /**
   * Checks if client is connected to rest server.
   * @returns true if connected
   */
  isRunning: async function (): Promise<Boolean> {
    const response = await api.get("");
    return response.data;
  },


  /**
   * Gets a profile dto with the given email and password.
   * @param emailParam email
   * @param passwordParam password
   * @returns a ProfileDto object or null
   */
  getProfile: async function (emailParam: String, passwordParam: String): Promise<ProfileDto> {
    const requestParams = {
      email: emailParam,
      password: passwordParam
    };

    const response = await api.get("/profiles", {params:requestParams});
    return response.data;
  },

  /**
   * Adds a new profile.
   * @param profile the profile to add
   * @returns true if sucessfully added
   */
  addNewProfile: async function (profile: ProfileDto): Promise<Boolean> {
    const response = await api.post("/profiles", profile);
    return response.data;
  },

  /**
   * Deletes the profile with the given ID.
   * @param profileId the id to delete
   * @returns true if successfully deleted
   */
  deleteProfile: async function (profileId: number): Promise<Boolean> {
    const path = "/profiles/" + profileId;
    const response = await api.delete(path);
    return response.data;
  },

  
  /**
   * Updates a profile.
   * @param profile the profile
   * @returns true if successfully updated
   */
  updateProfile: async function (profile: ProfileDto): Promise<Boolean> {
    const response = await api.put("/profiles", profile);
    return response.data;
  },

  /**
   * Adds a new deck.
   * @param deck the deck to add
   * @param profileId the owner of the deck
   */
  addNewDeck: async function (deck: DeckDto, profileId: number): Promise<any> {
    const requestParams = {
      ownerId: profileId,
    };
    api.post("/decks", deck, {params: requestParams});
  },

  /**
   * Updates a deck.
   * @param deck the deck to update
   */
  updateDeck: async function (deck: DeckDto): Promise<any> {
    api.put("/decks", deck);
  },

  /**
   * Deletes a deck with a given deckID.
   * @param deckId the ID of the deck to delete
   */
  deleteDeck: async function (deckId: number): Promise<any> {
    api.delete("/decks/" + deckId);
  },
    
};
