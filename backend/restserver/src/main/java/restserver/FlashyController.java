package restserver;

import db.DbConnection;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;




/**
 * Class that defines the REST API-endpoints.
 */
@RestController
@RequestMapping(FlashyController.FLASHY_SERVICE_PATH)
public class FlashyController {

    public static final String FLASHY_SERVICE_PATH = "/flashy/";


    /**
    * Check if the server is running.
    *
    * @return true if client is succesfully connected to server
    */
    @GetMapping
    public boolean isRunning() {

        //example on how to connect to db
        DbConnection dbConnection = new DbConnection();
        dbConnection.createDb();



        return true;
    }
    
}
