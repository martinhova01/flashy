package restserver;

import db.DbConnection;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;




/**
 * Class that defines the REST API-endpoints.
 */
@CrossOrigin
@RestController
@RequestMapping(FlashyController.FLASHY_SERVICE_PATH)
public class FlashyController {

    public static final String FLASHY_SERVICE_PATH = "/flashy/";


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

    @GetMapping("/test")
    public String test() {
        return "{\"message\": \"Success\"}";
    }
    
}
