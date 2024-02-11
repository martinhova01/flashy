package restserver;

import db.DbConnection;
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

import core.Profile;




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
    * Check if the server is running. Create db if not already created.
    *
    * @return true if client is succesfully connected to server
    */
    @GetMapping
    public boolean isRunning() {

        DbConnection dbConnection = new DbConnection();
        dbConnection.createDb();

        return true;
    }

    @GetMapping(path = "/profiles")
    public Profile getProfile(@RequestParam String email, @RequestParam String password) {
        return dbConnection.getProfile(email, password);

    }

    @PostMapping(path = "/profiles")
    public boolean addNewProfile(@RequestBody Profile profile) {
        if (dbConnection.getEmails().contains(profile.getEmail())) {
            return false;
        }

        dbConnection.addProfile(profile);
        return true;
    }

    @DeleteMapping(path = "/profiles/{profileId}")
    public void deleteProfile(@PathVariable("profileId") int profileId) {
        dbConnection.deleteProfile(profileId);
    }

    public boolean updateProfile() {
        return false;
    }
    
}
