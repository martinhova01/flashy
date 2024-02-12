package restserver;

import core.Profile;
import db.DbConnection;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
     */
    @DeleteMapping(path = "/profiles/{profileId}")
    public void deleteProfile(@PathVariable("profileId") int profileId) {
        dbConnection.deleteProfile(profileId);
    }

    public boolean updateProfile() {
        return false;
    }
    
}
