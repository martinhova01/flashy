package db;

/**
 * Class that generate SQL-queries as Strings.
 */
public class SqlQueries {

    /**
     * Generate SQL-query for getting a user with the given ID.
     *
     * @param profileId the id of the user.
     * @return the SQL-query as a String.
     */
    public static String getProfileQuery(int profileId) {
        return String.format("SELECT * FROM profile WHERE profile_id=%s;",
            Integer.toString(profileId));
    }


    /**
     * Generate SQL-query for adding a new profile.
     *
     * @param email email
     * @param firstName first name
     * @param lastName last name
     * @param school school
     * @return the SQL-query as a String
     */
    public static String addProfileQuery(String email, String password, String firstName,
        String lastName, String school) {
        return String.format(
            "INSERT INTO profile (email, password, firstname, lastname, school, is_admin) "
            + "VALUES ('%s', '%s', '%s', '%s', '%s', %b)",
            email, password, firstName, lastName, school, false);
    }

    /**
     * Generate SQL-query for deleting a profile with a given ID.
     *
     * @param profileId the ID of the profile to delete.
     * @return the SQL-query as a String
     */
    public static String deleteProfileQuery(int profileId) {
        return String.format("DELETE FROM profile WHERE profile_id=%s",
            Integer.toString(profileId));
    }

    /**
     * Generate SQL-query for updating a profile with a given ID.
     *
     * @param profileId the ID of the profile to update
     * @param email email
     * @param password password
     * @param firstName first name
     * @param lastName last name
     * @param school school
     * @param isAdmin is_admin
     * @return the SQL-query as a String
     */
    public static String updateProfileQuery(
        int profileId,
        String email,
        String password,
        String firstName,
        String lastName,
        String school,
        boolean isAdmin) {

        return String.format("UPDATE profile "
            + "SET email='%s', password='%s',"
            + "firstname='%s', lastname='%s', school='%s', is_admin=%b "
            + "WHERE profile_id=%s",
            email, password,
            firstName, lastName, school, isAdmin, Integer.toString(profileId));     
    }

    /**
     * Generate SQL-query to get all decks owned by a profile.
     *
     * @param profileId the id of the profile
     * @return the query as a string
     */
    public static String getOwnedDecksQuery(int profileId) {
        return String.format(
            "SELECT * FROM deck WHERE owner_id = %s",
            Integer.toString(profileId));
    }

    /**
     * Generate SQL-query to get all cards in a deck. 
     *
     * @param deckId the id of the deck
     * @return the query as a string
     */
    public static String getCardsQuery(int deckId) {
        return String.format("SELECT * FROM card where deck_id = %s", 
            Integer.toString(deckId));
    }

    /**
     * Generate SQL-query to add a new deck.
     *
     * @param profileId the owner of the deck
     * @param name the name of the deck
     * @param isPublic is deck public
     * @return the query as a string
     */
    public static String addNewDeckQuery(int profileId, String name, boolean isPublic) {
        return String.format("INSERT INTO deck(name, owner_id, is_public)"
            + "VALUES('%s', %s, %s)",
            name, Integer.toString(profileId), isPublic);
    }


    /**
     * Generate SQL-query to add a new Card. 
     *
     * @param deckId id
     * @param frontPage frontpage content
     * @param frontPagePic url
     * @param backPage backpage content
     * @param backPagePic url
     * @return the query as a string.
     */
    public static String addCardQuery(int deckId, String frontPage, String frontPagePic,
        String backPage, String backPagePic) {
        
        return String.format(
            "INSERT INTO CARD("
            + "front_page, front_page_picture, back_page, back_page_picture, deck_id)"
            + "VALUES('%s', '%s', '%s', '%s', %s)",
            frontPage, frontPagePic, backPage, backPagePic, deckId);
    }


    public static String deleteDeckQuery(int deckId) {
        return String.format("DELETE FROM deck WHERE deck_id = '%s'", Integer.toString(deckId));
    }

    /**
     * Generate SQL-query to get all profile IDs.
     *
     * @return the query as a string
     */
    public static String getAllProfileIds() {
        return String.format("SELECT profile_id FROM profile");
    }


    /**
     * Generate SQL-query to get profile ID with email and password. 
     *
     * @param email email
     * @param password password
     * @return the query as a string
     */
    public static String getProfileIdQuery(String email, String password) {
        return String.format("SELECT profile_id FROM profile"
        + " WHERE email = '%s' AND password = '%s'",
        email, password);
    }

    
}
