import { CardDto } from "../dto/CardDto";
import { CommentDto } from "../dto/CommentDto";
import { DeckDto } from "../dto/DeckDto";
import { ProfileDto } from "../dto/ProfileDto";
import { api } from "./api";

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
  getProfile: async function (
    emailParam: String,
    passwordParam: String
  ): Promise<ProfileDto> {
    const requestParams = {
      email: emailParam,
      password: passwordParam,
    };

    const response = await api.get("/profiles", { params: requestParams });
    return response.data;
  },

  /**
   * Gets a profile dto with the given email and password.
   * @param idparam id
   * @returns a ProfileDto object or null
   */
  getProfileById: async function (id: number): Promise<ProfileDto> {
    const requestParams = {
      profileId: id,
    };

    const response = await api.get("/profileById", { params: requestParams });
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
    await api.post("/decks", deck, { params: requestParams });
  },

  /**
   * Updates a deck.
   * @param deck the deck to update
   */
  updateDeck: async function (deck: DeckDto): Promise<any> {
    await api.put("/decks", deck);
  },

  /**
   * Deletes a deck with a given deckID.
   * @param deckId the ID of the deck to delete
   */
  deleteDeck: async function (deckId: number): Promise<any> {
    await api.delete("/decks/" + deckId);
  },

  /**
   * gets all profiles.
   * @returns all profiles
   */
  getAllProfiles: async function (): Promise<ProfileDto[]> {
    const response = await api.get("/allprofiles");
    return response.data;
  },


  getCardsByDeckId: async function (deckId: number): Promise<CardDto[]> {
    const requestParams = {
      deckId: Number(deckId),
    };
    const response = await api.get("/cardsByDeckId", { params: requestParams });
    return response.data;
  },
  
  getAllPublicDecks: async function (): Promise<DeckDto[]> {
    const response = await api.get("/decks");
    return response.data;
  },

  /**
   * Get all decks favorited by the profile.
   * @param profileId the id of the profile
   * @returns the list of decks
   */
  getFavoriteDecks: async function (profileId: number): Promise<DeckDto[]> {
    const response = await api.get("/profiles/" + profileId + "/favorites");
    return response.data;
  },

  /**
   * Add / remove favorite.
   * 
   * @param profileId the profile that favorites
   * @param deckId the deck to favorite
   * @returns true if favorite was added, false if favorite was removed
   */
  favorite: async function (profileId: number, deckId: number): Promise<boolean> {
    const requestParams = {
      profileId: profileId,
      deckId: deckId
    };
    const response = await api.put("/favorite", {}, {params: requestParams})
    return response.data;
  },

  /**
   * Check if a profile has favorited a deck.
   * @param profileId the profile
   * @param deckId the deck
   * @returns true if the profile has favorited the deck
   */
  favoriteExists: async function (profileId: number, deckId: number): Promise<boolean> {
    const requestParams = {
      profileId: profileId,
      deckId: deckId
    };
    const response = await api.get("/favoriteExists", {params: requestParams});
    return response.data;
  },

  getOwner: async function (deckId: number) {
    const response = await api.get("/decks/" + deckId + "/owner");
    return response.data;
  },

  /**
   * Check if a profile has liked a deck.
   * @param profileId the profile
   * @param deckId the deck
   * @returns true if the profile has liked the deck
   */
  likeExists: async function (profileId: number, deckId: number): Promise<boolean> {
    const requestParams = {
      profileId: profileId,
      deckId: deckId
    };
    const response = await api.get("/likeExists", {params: requestParams});
    return response.data;
  },

  /**
   * Add / remove like.
   * 
   * @param profileId the profile that likes
   * @param deckId the deck to like
   * @returns true if like was added, false if like was removed
   */
  like: async function (profileId: number, deckId: number): Promise<boolean> {
    const requestParams = {
      profileId: profileId,
      deckId: deckId
    };
    const response = await api.put("/like", {}, {params: requestParams});
    return response.data;
  },
  
  /**
   * Add a comment to a deck.
   * 
   * @param profileId The profileID of the person commenting
   * @param deckId The deck that the comment is attached to
   * @param comment The body of the comment
   * @returns true if the comment was added, false otherwise
   */
  addComment: async function (profileId: number, deckId: number, comment: String): Promise<boolean> {
    const requestParams = {
      profileId: profileId,
      deckId: deckId,
      comment: comment
    };
    const response = await api.put("/comment", {}, {params: requestParams});
    return response.data;
  },
  
  /**
   * Fetch all comments on a given deck.
   * 
   * @param deckId The ID of the deck we want to find comments of.
   * @returns All comments (CommentDtos) on the given deck.
   */
  getComments: async function (deckId: number): Promise<CommentDto[]> {
    const requestParams = {
      deckId: deckId
    }
    const response = await api.get("/deckComments", {params: requestParams});
    return response.data;
  },
  
};