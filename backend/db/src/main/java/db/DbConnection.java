package db;

import core.Card;
import core.Comment;
import core.Deck;
import core.Profile;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * Class that handles connection to the database.
 */
public class DbConnection {

    private static String filePath = System.getProperty("user.home") + System.getProperty("file.separator")
            + "flashy.db";

    private Connection connection;

    /**
     * Constructor. Atempts to connect to database. Creates database if not already
     * created
     */
    public DbConnection() {
        try {
            if (dbExits()) {
                connection = DriverManager.getConnection("jdbc:sqlite:" + filePath);
            } else {
                connection = DriverManager.getConnection("jdbc:sqlite:" + filePath);
                createDb();
            }

        } catch (SQLException e) {
            System.out.println("SQLite connection error: " + e.getMessage());
        }
    }

    /**
     * Checks if database file has been created.
     *
     * @return true if db exists.
     */
    public boolean dbExits() {
        File databaseFile = new File(filePath);
        return databaseFile.exists();
    }

    /**
     * Reads the sql file.
     *
     * @return the file content as a String
     */
    private String readSqlFile() {
        StringBuilder content = new StringBuilder();
        InputStream is = getClass().getResourceAsStream("databaseSchema.sql");

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return content.toString();
    }

    /**
     * Runs sql file.
     */
    private void runSqlFile() {
        try (Statement stmt = connection.createStatement()) {
            String[] sqlStatements = readSqlFile().split(";");
            for (String sqlStatement : sqlStatements) {
                if (!sqlStatement.trim().isEmpty()) {
                    stmt.execute(sqlStatement);
                }
            }
            System.out.println("Tables created successfully.");
        } catch (SQLException e) {
            System.out.println("Error creating tables: " + e.getMessage());
        }
    }

    /**
     * Creates db-file and fills db with tables.
     */
    public void createDb() {
        try {

            // Run SQL file to create tables and seeds data into tables
            runSqlFile();
            seedData();

        } catch (SQLException e) {
            System.out.println("SQLite connection error: " + e.getMessage());
        }
    }

    /**
     * Seeds data into the tables.
     *
     * @throws SQLException if sql file is invalid
     */

    public void seedData() throws SQLException {
        seedDecks();
        seedProfiles();
        seedCards();
        seedUserLikes();
        seedFavorites();
        seedComments();
        System.out.println("Sample data seeded successfully.");
    }

    private void seedDecks() {
        String insertQuery = "INSERT INTO deck (name, owner_id, is_public, category)"
                + "VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(insertQuery)) {
            statement.setString(1, "Sample Deck 1");
            statement.setInt(2, 1);
            statement.setBoolean(3, true);
            statement.setString(4, "Annet");
            statement.executeUpdate();

            statement.setString(1, "Sample Deck 2");
            statement.setInt(2, 2);
            statement.setBoolean(3, false);
            statement.setString(4, "Annet");
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void seedProfiles() {
        String insertQuery = "INSERT INTO profile (email, password, firstname, lastname, school, is_admin) "
                + "VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(insertQuery)) {
            statement.setString(1, "user1@example.com");
            statement.setString(2, "password");
            statement.setString(3, "John");
            statement.setString(4, "Doe");
            statement.setString(5, "NTNU");
            statement.setBoolean(6, false);
            statement.executeUpdate();

            statement.setString(1, "admin@example.com");
            statement.setString(2, "adminpassword");
            statement.setString(3, "Admin");
            statement.setString(4, "User");
            statement.setString(5, "Admin");
            statement.setBoolean(6, true);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void seedCards() {
        String insertQuery = "INSERT INTO card"
                + "(card_id, front_page, front_page_picture, back_page, back_page_picture, deck_id)"
                + "VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(insertQuery)) {
            statement.setInt(1, 0);
            statement.setString(2, "Sample Front Page 1");
            statement.setString(3, "front_page_picture_1.jpg");
            statement.setString(4, "Sample Back Page 1");
            statement.setString(5, "back_page_picture_1.jpg");
            statement.setInt(6, 1);
            statement.executeUpdate();

            statement.setInt(1, 0);
            statement.setString(2, "Sample Front Page 2");
            statement.setString(3, "front_page_picture_2.jpg");
            statement.setString(4, "Sample Back Page 2");
            statement.setString(5, "back_page_picture_2.jpg");
            statement.setInt(6, 2);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void seedUserLikes() {
        String insertQuery = "INSERT INTO user_like (deck_id, profile_id) VALUES (?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(insertQuery)) {
            statement.setInt(1, 1);
            statement.setInt(2, 1);
            statement.executeUpdate();

            statement.setInt(1, 2);
            statement.setInt(2, 2);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void seedFavorites() {
        String insertQuery = "INSERT INTO favorite (deck_id, profile_id) VALUES (?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(insertQuery)) {
            statement.setInt(1, 1); // Assuming deck_id 1 exists
            statement.setInt(2, 1);
            statement.executeUpdate();

            statement.setInt(1, 2);
            statement.setInt(2, 2);
            statement.executeUpdate();

            // Add more favorites relationships as needed
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void seedComments() {
        String insertQuery = 
            "INSERT INTO comments (profile_id, deck_id, comment) VALUES (?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(insertQuery)) {
            // Comment for profile_id 1, deck_id 1
            statement.setInt(1, 1);
            statement.setInt(2, 1);
            statement.setString(3, "Comment for profile_id 1, deck_id 1");
            statement.executeUpdate();
    
            // Comment for profile_id 2, deck_id 2
            statement.setInt(1, 2);
            statement.setInt(2, 2);
            statement.setString(3, "Comment for profile_id 2, deck_id 2");
            statement.executeUpdate();
    
            // Add more comments as needed
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    


    /**
     * Atempts to get a profile with the given email and password from the database.
     * Gets all the owned decks of the profile.
     *
     * @param email    email
     * @param password password
     * @return the profile if found, null otherwise
     */
    public Profile getProfile(String email, String password) {

        String query = SqlQueries.getProfileIdQuery(email, password);

        try {
            Statement statement = this.connection.createStatement();
            ResultSet result = statement.executeQuery(query);
            if (!result.next()) {
                return null;
            }
            int id = result.getInt("profile_id");
            return getProfileById(id);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Gets a list of all the emails registered in the database.
     *
     * @return the list of emails
     */
    public List<String> getEmails() {
        String query = "SELECT email FROM profile";
        try {
            Statement statement = this.connection.createStatement();
            ResultSet result = statement.executeQuery(query);
            List<String> emails = new ArrayList<>();
            while (result.next()) {
                emails.add(result.getString("email"));
            }
            return emails;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }

    }

    /**
     * Adds a new profile to the database.
     *
     * @param p the profile to add
     */
    public void addProfile(Profile p) {
        String query = SqlQueries.addProfileQuery(
                p.getEmail(), p.getPassword(), p.getFirstname(), p.getLastname(), p.getSchool());

        try {
            Statement statement = this.connection.createStatement();
            statement.execute(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    /**
     * Deletes a profile from the database.
     *
     * @param profileId the id of the profile to delete
     */
    public void deleteProfile(int profileId) {
        String query = SqlQueries.deleteProfileQuery(profileId);
        try {
            Statement statement = this.connection.createStatement();
            statement.execute(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * Updates the profile in the database.
     *
     * @param p the profile
     */
    public void updateProfile(Profile p) {
        String query = SqlQueries.updateProfileQuery(
                p.getProfileId(), p.getEmail(), p.getPassword(),
                p.getFirstname(), p.getLastname(), p.getSchool(), p.isAdmin());

        try {
            Statement statement = this.connection.createStatement();
            statement.execute(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * Checks if profile with given ID exists.
     *
     * @param profileId id.
     * @return true if profile exists
     */
    public boolean profileExists(int profileId) {
        String query = SqlQueries.getProfileQuery(profileId);

        try {
            Statement statement = this.connection.createStatement();
            ResultSet result = statement.executeQuery(query);
            return result.next();

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Adds a new deck to the database.
     *
     * @param profileId the owner of the deck
     * @param deck      the deck to add
     */
    public void addNewDeck(int profileId, Deck deck) {

        String query = SqlQueries.addNewDeckQuery(profileId,
                deck.getDeckName(), deck.getVisibility(), deck.getCategory());

        try {
            Statement statement = this.connection.createStatement();
            statement.execute(query);

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // find out which ID was given to the new deck
        String getIdQuery = "SELECT max(deck_id) as max FROM deck;";
        try {
            ResultSet result = connection.createStatement().executeQuery(getIdQuery);
            int deckId = result.getInt("max");
            for (Card c : deck.getCardList()) {
                addCard(deckId, c);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    private void addCard(int deckId, Card c) {
        String query = SqlQueries.addCardQuery(
                c.getCardNumber(),
                deckId,
                c.getFrontpageString(),
                c.getFrontpagePicture(),
                c.getBackpageString(),
                c.getBackpagePicture());

        try {
            Statement statement = this.connection.createStatement();
            statement.execute(query);

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }


    /**
     * gets a deck to the database.
     *
     * @param deckId the deck to get
     */
    public Deck getDeckById(int deckId) {
        String query = SqlQueries.getDeckByIdQuery(deckId);

        try {
            Statement statement = this.connection.createStatement();
            ResultSet result = statement.executeQuery(query);
            result.next();

            String name = result.getString("name");
            boolean isPublic = result.getBoolean("is_public");
            String category = result.getString("category");
            int likes = getNumberOfLikes(deckId);
            Deck d = new Deck(name, deckId, isPublic, category, likes);

            this.addCardsToDeck(d);
            return d;


        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * checks if deck exsists.
     *
     * @param deckId the deck to add
     */
    public Boolean deckExist(int deckId) {
        String query = SqlQueries.getCardsQuery(deckId);

        try {
            Statement statement = this.connection.createStatement();
            ResultSet result = statement.executeQuery(query);
            return result.next();

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Update a deck in the database.
     *
     * @param d the deck to update
     */
    public void updateDeck(Deck d) {
        String updateDeckQuery = SqlQueries.updateDeckQuery(
                d.getDeckId(), d.getDeckName(), d.getVisibility(), d.getCategory());
        try {
            Statement statement = connection.createStatement();
            statement.execute(updateDeckQuery);

            for (Card c : d.getCardList()) {

                if (cardExists(c.getCardNumber(), d.getDeckId())) {
                    String query = SqlQueries.updateCardQuery(
                            c.getCardNumber(),
                            d.getDeckId(),
                            c.getFrontpageString(),
                            c.getFrontpagePicture(),
                            c.getBackpageString(),
                            c.getBackpagePicture());
                    statement.execute(query);
                } else {
                    addCard(d.getDeckId(), c);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private boolean cardExists(int cardNumber, int deckId) {
        String query = String.format(
                "SELECT * FROM card WHERE card_id = %s AND deck_id = %s",
                Integer.toString(cardNumber), Integer.toString(deckId));

        try {
            Statement statement = this.connection.createStatement();
            ResultSet result = statement.executeQuery(query);
            return result.next();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

    }

    /**
     * Delete a deck with a given ID from the database.
     *
     * @param deckId the id of the deck to delete
     */
    public void deleteDeck(int deckId) {
        String query = SqlQueries.deleteDeckQuery(deckId);
        try {
            Statement statement = this.connection.createStatement();
            statement.execute(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * Get all profiles from the database.
     */
    public ArrayList<Profile> getAllProfiles() {
        ArrayList<Profile> profiles = new ArrayList<Profile>();
        String query = SqlQueries.getAllProfileIds();

        try {
            ResultSet result = connection.createStatement().executeQuery(query);
            while (result.next()) {
                int id = result.getInt("profile_id");
                profiles.add(getProfileById(id));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return profiles;
    }

    /**
     * Get a Profile with a given ID from the database.
     */
    public Profile getProfileById(int id) {
        String getProfileQuery = SqlQueries.getProfileQuery(id);
        try {
            ResultSet profileResultSet = connection.createStatement().executeQuery(getProfileQuery);
            if (!profileResultSet.next()) {
                return null;
            }
            int profileId = profileResultSet.getInt("profile_id");
            String emailResult = profileResultSet.getString("email");
            String passwordResult = profileResultSet.getString("password");
            String firstname = profileResultSet.getString("firstname");
            String lastname = profileResultSet.getString("lastname");
            String school = profileResultSet.getString("school");
            boolean isAdmin = profileResultSet.getBoolean("is_admin");

            ResultSet deckResultSet = connection
                    .createStatement()
                    .executeQuery(SqlQueries.getOwnedDecksQuery(profileId));
            List<Deck> decks = new ArrayList<>();
            while (deckResultSet.next()) {
                String name = deckResultSet.getString("name");
                int deckId = deckResultSet.getInt("deck_id");
                boolean isPublic = deckResultSet.getBoolean("is_public");
                String category = deckResultSet.getString("category");
                int likes = this.getNumberOfLikes(deckId);
                Deck d = new Deck(name, deckId, isPublic, category, likes);

                this.addCardsToDeck(d);
                decks.add(d);
            }
            return new Profile(profileId, emailResult, passwordResult,
                    firstname, lastname, school, isAdmin, decks);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    private int getNumberOfLikes(int deckId) {
        String query = SqlQueries.getNumberOfLikesQuery(deckId);

        try {
            ResultSet result = connection.createStatement().executeQuery(query);
            result.next();
            int likes = result.getInt("likes");

            return likes;

        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    private void addCardsToDeck(Deck deck) {
        try {
            ResultSet cardResultSet = connection
                    .createStatement()
                    .executeQuery(SqlQueries.getCardsQuery(deck.getDeckId()));
            while (cardResultSet.next()) {
                int cardId = cardResultSet.getInt("card_id");
                String frontPage = cardResultSet.getString("front_page");
                String frontPagePic = cardResultSet.getString("front_page_picture");
                String backPage = cardResultSet.getString("back_page");
                String backPagePic = cardResultSet.getString("back_page_picture");
                deck.addCard(new Card(cardId, frontPage, backPage, frontPagePic, backPagePic));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    /**
     * Get all public decks.
     *
     * @return the list
     */
    public List<Deck> getAllPublicDecks() {
        String query = "SELECT * FROM deck WHERE is_public = true";

        List<Deck> deckList = new ArrayList<>();

        try {
            ResultSet result = connection.createStatement().executeQuery(query);
            while (result.next()) {
                String name = result.getString("name");
                int deckId = result.getInt("deck_id");
                boolean isPublic = result.getBoolean("is_public");
                String category = result.getString("category");
                int likes = getNumberOfLikes(deckId);
                Deck d = new Deck(name, deckId, isPublic, category, likes);

                this.addCardsToDeck(d);

                deckList.add(d);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        deckList.sort((d1, d2) -> d2.getLikes() - d1.getLikes());
        return deckList;
    }


    /**
     * add comment to database.

     * @param userId userId
     * @param deckId deckId
     * @param comment comment to deck
     */
    public void addComment(Integer userId, Integer deckId, String comment) {
        String query = SqlQueries.addComment(userId, deckId, comment);

        try {
            connection.createStatement().executeQuery(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    /**
     * add comment to database.

     * @param deckId deckId
     */
    public List<Comment> getDeckComments(Integer deckId) {
        String query = SqlQueries.getDeckComments(deckId);

        List<Comment> comments = new ArrayList<>();
        
        try {
            ResultSet result = connection.createStatement().executeQuery(query);
            while (result.next()) {
                String firstname = result.getString("firstname");
                String lastname = result.getString("lastname");
                String comment = result.getString("comment");

                Comment commentObj = new Comment(firstname, lastname, comment);

                comments.add(commentObj);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return comments;

    }


    /**
     * If favorite row exists, delete row. Else add row
     *
     * @param profileId the profile that favorites
     * @param deckId    the deck to favorite
     * @return true if row was added, false if row was deleted
     */
    public boolean favorite(int profileId, int deckId) {
        String query = "";
        boolean ret = false;
        if (favoriteExists(profileId, deckId)) {
            query = SqlQueries.deleteFavoriteQuery(profileId, deckId);
            ret = false;
        } else {
            query = SqlQueries.addFavoriteQuery(profileId, deckId);
            ret = true;
        }

        try {
            connection.createStatement().execute(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return ret;
    }

    /**
     * Checks if a row in favorite exists.
     *
     * @param profileId the profile
     * @param deckId    the deck
     * @return true if row exists
     */
    public boolean favoriteExists(int profileId, int deckId) {
        String query = SqlQueries.getFavoriteQuery(profileId, deckId);

        try {
            Statement statement = this.connection.createStatement();
            ResultSet result = statement.executeQuery(query);
            return result.next();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Get all decks favorited by this profile.
     *
     * @param profileId the profile
     * @return the list of favorite decks
     */
    public List<Deck> getFavoriteDecks(int profileId) {
        String query = SqlQueries.getFavoriteDecksQuery(profileId);

        List<Deck> deckList = new ArrayList<>();

        try {
            ResultSet result = connection.createStatement().executeQuery(query);
            while (result.next()) {
                String name = result.getString("name");
                int deckId = result.getInt("deck_id");
                boolean isPublic = result.getBoolean("is_public");
                String category = result.getString("category");
                int likes = this.getNumberOfLikes(deckId);
                Deck d = new Deck(name, deckId, isPublic, category, likes);

                this.addCardsToDeck(d);

                deckList.add(d);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return deckList;
    }


    /**
     * Get the name of the owner of a deck.
     *
     * @param deckId the deck
     * @return the name as a string
     */
    public String getOwner(int deckId) {
        String query = SqlQueries.getOwnerQuery(deckId);

        try {
            ResultSet result = connection.createStatement().executeQuery(query);
            result.next();
            String firstName = result.getString("firstname");
            String lastName = result.getString("lastname");

            return firstName + " " + lastName;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * If user_like row exists, delete row. Else add row 
     *
     * @param profileId the profile that likes
     * @param deckId the deck to like
     * @return true if row was added, false if row was deleted
     */
    public boolean like(int profileId, int deckId) {
        String query = "";
        boolean ret = false;
        if (likeExists(profileId, deckId)) {
            query = SqlQueries.deleteLikeQuery(profileId, deckId);
            ret = false;
        } else {
            query = SqlQueries.addLikeQuery(profileId, deckId);
            ret = true;
        }

        try {
            connection.createStatement().execute(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return ret;
    }

    /**
     * Checks if a row in user_like exists. 
     *
     * @param profileId the profile
     * @param deckId the deck
     * @return true if row exists
     */
    public boolean likeExists(int profileId, int deckId) {
        String query = SqlQueries.getLikeQuery(profileId, deckId);

        try {
            Statement statement = this.connection.createStatement();
            ResultSet result = statement.executeQuery(query);
            return result.next();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public String getOwnerSchool(int deckId) {
        String query = SqlQueries.getOwnerSchoolQuery(deckId);

        try {
            ResultSet result = connection.createStatement().executeQuery(query);
            result.next();
            String ownerSchool = result.getString("school");

            return ownerSchool;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}