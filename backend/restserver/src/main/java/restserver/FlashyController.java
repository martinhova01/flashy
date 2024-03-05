package restserver;

import core.Card;
import core.Comment;
import core.Deck;
import core.Profile;
import db.DbConnection;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;






/**
 * Class that defines the REST API-endpoints.
 */
@CrossOrigin
@RestController
@RequestMapping(FlashyController.FLASHY_SERVICE_PATH)
public class FlashyController {

    public static final String FLASHY_SERVICE_PATH = "/flashy/";
    private DbConnection dbConnection = new DbConnection();


    /**
    * Check if the server is running.
    *
    * @return true if client is succesfully connected to server
    */
    @GetMapping
    public boolean isRunning() {
        return true;
    }

    /**
     * Gets a profile with the given email and password from the database. 
     *
     * @param email email
     * @param password password
     * @return the profile or null if profile does not exist
     */
    @GetMapping(path = "/profiles")
    public Profile getProfile(@RequestParam String email, @RequestParam String password) {
        return dbConnection.getProfile(email, password);
    }

    /**
     * Gets a profile with the given id from the database. 
     *
     * @param profileId id
     * @return the profile or null if profile does not exist
     */
    @GetMapping(path = "/profileById")
    public Profile getProfileById(@RequestParam int profileId) {
        return dbConnection.getProfileById(profileId);
    }

    @GetMapping (path = "/cardsByDeckId")
    public ArrayList<Card> getCardsByDeckId(@RequestParam int deckId) {
        return dbConnection.getDeckById(deckId);
    }
    

    /**
     * Add a new profile to the database.
     *
     * @param profile the profile to add
     * @return true if successfully added or false if email already exists.
     */
    @PostMapping(path = "/profiles")
    public boolean addNewProfile(@RequestBody Profile profile) {
        if (dbConnection.getEmails().contains(profile.getEmail())) {
            return false;
        }

        dbConnection.addProfile(profile);
        return true;
    }

    /**
     * Deletes the profile with the given ID. 
     *
     * @param profileId the id to delete
     * @return true if successfully updated, false otherwise.
     */
    @DeleteMapping(path = "/profiles/{profileId}")
    public boolean deleteProfile(@PathVariable("profileId") int profileId) {
        if (!dbConnection.profileExists(profileId)) {
            return false;
        }
        dbConnection.deleteProfile(profileId);
        return true;
    }

    /**
     * Updates profile with given profileID. 
     *
     * @param profile profile
     * @return true if successfully updated, false otherwise.
     */
    @PutMapping(path = "/profiles")
    public boolean updateProfile(@RequestBody Profile profile) {
        if (!dbConnection.profileExists(profile.getProfileId())) {
            return false;
        }
        dbConnection.updateProfile(profile);
        return true;
    }

    /**
     * Add a new deck.
     *
     * @param deck the deck to add
     * @param ownerId the owner of the deck
     * @return true if successfully added, false if owner does not exist
     */
    @PostMapping(path = "/decks")
    public boolean addNewDeck(@RequestBody Deck deck, @RequestParam int ownerId) {
        if (!dbConnection.profileExists(ownerId)) {
            return false;
        }
        dbConnection.addNewDeck(ownerId, deck);
        return true;
    }

    /**
     * Updates a deck. 
     *
     * @param deck the deck to update
     */
    @PutMapping(path = "/decks")
    public void updateDeck(@RequestBody Deck deck) {
        dbConnection.updateDeck(deck);
    }

    /**
     * Delete a deck with a given ID. 
     *
     * @param deckId the id of the deck to delete
     */
    @DeleteMapping(path = "/decks/{deck_id}")
    public void deleteDeck(@PathVariable("deck_id") int deckId) {
        dbConnection.deleteDeck(deckId);
    }
    

    /**
     * gets all userprofiles.
     *
     * @return true if successfully updated, false otherwise.
     */
    @GetMapping(path = "/allprofiles")
    public ArrayList<Profile> getAllProfiles() {
        return dbConnection.getAllProfiles();
    }

    /**
     * Gets all public decks.
     *
     * @return the list of public decks
     */
    @GetMapping(path = "/decks")
    public List<Deck> getAllPublicDecks() {
        return dbConnection.getAllPublicDecks();
    }

    /**
     * Updates a deck. 
     *
     * @param profileId profile_id
     * @param deckId deck id
     * @param comment comment
     */
    @PutMapping(path = "/comment")
    public boolean addComment(@RequestParam int profileId,
        @RequestParam int deckId, @RequestParam String comment) {
        if (!dbConnection.profileExists(profileId) || !dbConnection.deckExist(deckId)){
            return false;
        } else {
            dbConnection.addComment(profileId, deckId, comment);
            return true;
        }
    }

    /**
     * gets all comments to specific deck.
     *
     * @return List with the comments
     */
    @GetMapping(path = "/deckComments")
    public List<Comment> getCommentsByDeckId(@RequestParam int deckId) {
        if (!dbConnection.deckExist(deckId)) {
            return new ArrayList<Comment>();
        } else {
            return dbConnection.getDeckComments(deckId);
        }
    }


    /**
     * If the profile already favorites the deck, remove the favorite.
     * Else add the deck as a favorite.
     *
     * @param profileId the profile
     * @param deckId the deck
     * @return true if favorite was added, false if favorite was deleted
     */
    @PutMapping(path = "/favorite")
    public boolean favorite(@RequestParam int profileId, @RequestParam int deckId) {
        return dbConnection.favorite(profileId, deckId);
    }

    /**
     * Checks if a profile has favorited a deck. 
     *
     * @param profileId the profile
     * @param deckId the deck
     * @return true id profile has favorited the deck
     */
    @GetMapping(path = "/favoriteExists")
    public boolean hasFavorited(@RequestParam int profileId, @RequestParam int deckId) {
        return dbConnection.favoriteExists(profileId, deckId);
    }


    /**
     * Gets all decks favorited by the profile.
     *
     * @param profileId the profile
     * @return the list of favorite decks
     */
    @GetMapping(path = "profiles/{profileId}/favorites")
    public List<Deck> getFavoriteDecks(@PathVariable("profileId") int profileId) {
        return dbConnection.getFavoriteDecks(profileId);
    }
}
