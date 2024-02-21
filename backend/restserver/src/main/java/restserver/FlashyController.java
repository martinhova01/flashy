package restserver;

import core.Deck;
import core.Profile;
import db.DbConnection;

import java.util.ArrayList;

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
    public Profile getProfileById(@RequestParam int profileId){
        return dbConnection.getProfileById(profileId);
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
     * gets all userprofiles
     * @return true if successfully updated, false otherwise.
     */
    @GetMapping(path = "/allprofiles")
    public ArrayList<Profile> getAllProfiles() {
        return dbConnection.getAllProfiles();
    }
}
