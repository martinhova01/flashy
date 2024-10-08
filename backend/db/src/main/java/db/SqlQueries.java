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
     * @param email     email
     * @param firstName first name
     * @param lastName  last name
     * @param school    school
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
     * @param email     email
     * @param password  password
     * @param firstName first name
     * @param lastName  last name
     * @param school    school
     * @param isAdmin   is_admin
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
     * @param name      the name of the deck
     * @param visibility 0=private, 1=public, 2=public to edit
     * @return the query as a string
     */
    public static String addNewDeckQuery(int profileId,
        String name, int visibility, String category) {
        return String.format("INSERT INTO deck(name, owner_id, visibility, category)"
            + "VALUES('%s', %s, %s, '%s')",
            name, Integer.toString(profileId), Integer.toString(visibility), category);
    }

    /**
     * Generate SQL-query to add a new Card.
     *
     * @param cardNumber   card number
     * @param deckId       deckId
     * @param frontPage    frontpage content
     * @param frontPagePic url
     * @param backPage     backpage content
     * @param backPagePic  url
     * @return the query as a string.
     */
    public static String addCardQuery(int cardNumber, int deckId, String frontPage,
        String frontPagePic, String backPage, String backPagePic) {

        return String.format(
            "INSERT INTO CARD("
            + "card_id, front_page, front_page_picture, back_page, back_page_picture, deck_id)"
            + "VALUES(%s, '%s', '%s', '%s', '%s', %s)",
            cardNumber, frontPage, frontPagePic, backPage, backPagePic, deckId);
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
     * @param email    email
     * @param password password
     * @return the query as a string
     */
    public static String getProfileIdQuery(String email, String password) {
        return String.format("SELECT profile_id FROM profile"
            + " WHERE email = '%s' AND password = '%s'",
            email, password);
    }

    /**
     * Generate SQL-query to update a deck.
     *
     * @param deckId     id
     * @param deckName   name
     * @param visibility visibility
     * @param category   category
     * @return the query as a string.
     */
    public static String updateDeckQuery(int deckId,
        String deckName, int visibility, String category) {
        return String.format("UPDATE deck SET name = '%s', visibility = %s, category = '%s'"
            + "WHERE deck_id = %s",
            deckName, Integer.toString(visibility), category, Integer.toString(deckId));
    }

    /**
     * Generate SQL-query to update a card.
     *
     * @param cardNumber   id
     * @param frontPage    front page
     * @param frontPagePic front page pic
     * @param backPage     back page
     * @param backPagePic  back page pic
     * @return the query as a string
     */
    public static String updateCardQuery(int cardNumber, int deckId, String frontPage,
        String frontPagePic, String backPage, String backPagePic) {
        return String.format("UPDATE card "
            + "SET front_page='%s', front_page_picture='%s', back_page='%s', back_page_picture='%s'"
            + "WHERE card_id = %s AND deck_id = %s",
            frontPage, frontPagePic, backPage, backPagePic,
            Integer.toString(cardNumber), Integer.toString(deckId));
    }

    /**
     * Generate query to check if a profile has favorited a deck.
     *
     * @param profileId profileID
     * @param deckId    deckId
     * @return the query as a string
     */
    public static String getFavoriteQuery(int profileId, int deckId) {
        return String.format("SELECT * FROM favorite WHERE deck_id = %s AND profile_id = %s",
            Integer.toString(deckId), Integer.toString(profileId));
    }

    /**
     * Generate query to delete a row from the favorite table.
     *
     * @param profileId profileID
     * @param deckId    deckId
     * @return the query as a String
     */
    public static String deleteFavoriteQuery(int profileId, int deckId) {
        return String.format("DELETE FROM favorite WHERE deck_id = %s AND profile_id = %s",
            Integer.toString(deckId), Integer.toString(profileId));
    }

    /**
     * Generate query to adda row to the favorite table.
     *
     * @param profileId profileID
     * @param deckId    deckId
     * @return the query as a String
     */
    public static String addFavoriteQuery(int profileId, int deckId) {
        return String.format("INSERT INTO favorite (deck_id, profile_id) VALUES (%s, %s)",
            Integer.toString(deckId), Integer.toString(profileId));
    }

    /**
     * Generates query to get all decks favorited by a profile.
     *
     * @param profileId the profile
     * @return the query as a string
     */
    public static String getFavoriteDecksQuery(int profileId) {
        return String.format("SELECT deck.deck_id, deck.name, deck.category, deck.visibility "
            + "FROM favorite INNER JOIN deck ON (favorite.deck_id = deck.deck_id) "
            + "WHERE favorite.profile_id = %s",
            Integer.toString(profileId));
    }

    /**
     * generate a query to get the owner name of a deck.
     *
     * @param deckId the deck id 
     * @return the query as a string
     */
    public static String getOwnerQuery(int deckId) {
        return String.format("SELECT profile.firstname, profile.lastname "
            + "FROM deck INNER JOIN profile ON (profile.profile_id = deck.owner_id) "
            + "WHERE deck.deck_id = %s", Integer.toString(deckId));
    }

    /**
     * Generate query to check if a profile has liked a deck.
     *
     * @param profileId profileID
     * @param deckId deckId
     * @return the query as a string
     */
    public static String getLikeQuery(int profileId, int deckId) {
        return String.format("SELECT * FROM user_like WHERE deck_id = %s AND profile_id = %s",
            Integer.toString(deckId), Integer.toString(profileId));
    }

    /**
     * Generate query to delete a row from the like table. 
     *
     * @param profileId profileID
     * @param deckId deckId
     * @return the query as a String
     */
    public static String deleteLikeQuery(int profileId, int deckId) {
        return String.format("DELETE FROM user_like WHERE deck_id = %s AND profile_id = %s",
            Integer.toString(deckId), Integer.toString(profileId));
    }

    /**
     * Generate query to add a row to the like table.
     *
     * @param profileId profileID
     * @param deckId deckId
     * @return the query as a String
     */
    public static String addLikeQuery(int profileId, int deckId) {
        return String.format("INSERT INTO user_like (deck_id, profile_id) VALUES (%s, %s)",
            Integer.toString(deckId), Integer.toString(profileId));
    }

    /**
     * Generate query to get number of likes on a deck.
     *
     * @param deckId the deck
     * @return the query as a string
     */
    public static String getNumberOfLikesQuery(int deckId) {
        return String.format("SELECT count(*) as likes FROM user_like "
            + "WHERE deck_id = %s", Integer.toString(deckId));
    }


    /**
     * Generate SQL-query to get profile ID with email and password. 
     *
     * @param userId userID
     * @param deckId deckId
     * @param comment comment from user on deck
     * @return the query as a string
     */
    public static String addComment(int userId, int deckId, String comment) {
        return String.format(
            "INSERT INTO comments ("
            + "profile_id, deck_id, comment) "
            + "VALUES (%s, %s, '%s')", 
            userId, deckId, comment);
    }

    /**
     * Query getting all comments to specific deck.
     *
     * @param deckId deckId
     * @return the query as a string
     */
    public static String getDeckComments(Integer deckId) {
        return String.format("SELECT firstname, lastname, comment FROM comments "
            + "INNER JOIN profile ON comments.profile_id = profile.profile_id "
            + "WHERE deck_id = '%s'", deckId);
    }

    
    
    /**
     * Generate SQL-query to get the school of the owner of a deck.
     *
     * @param deckId the deckId of the deck
     * @return the query as a string
     */
    public static String getOwnerSchoolQuery(int deckId) {
        return String.format("SELECT profile.school "
            + "FROM deck INNER JOIN profile ON (profile.profile_id = deck.owner_id) "
            + "WHERE deck.deck_id = %s", Integer.toString(deckId));
    }

    /**
     * Generate SQL-query to get a deck by the deckId.
     *
     * @param deckId the deckId
     * @return the query as a string
     */
    public static String getDeckByIdQuery(int deckId) {
        return String.format("SELECT * FROM deck "
            + "WHERE deck_id = %s", Integer.toString(deckId));
    }

}
