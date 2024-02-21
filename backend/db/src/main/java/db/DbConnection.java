package db;

import core.Card;
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

    private static String filePath = 
        System.getProperty("user.home") + System.getProperty("file.separator") + "flashy.db";

    private Connection connection;

    /**
     * Constructor. Atempts to connect to database. Creates database if not already created
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
        System.out.println("Sample data seeded successfully.");
    }

    private void seedDecks() {
        String insertQuery = "INSERT INTO deck (name, owner_id) VALUES (?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(insertQuery)) {
            statement.setString(1, "Sample Deck 1");
            statement.setInt(2, 1);
            statement.executeUpdate();

            statement.setString(1, "Sample Deck 2");
            statement.setInt(2, 2);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void seedProfiles() {
        String insertQuery =
            "INSERT INTO profile (email, password, firstname, lastname, school, is_admin) "
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
            + "(front_page, front_page_picture, back_page, back_page_picture, deck_id)"
            + "VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(insertQuery)) {
            statement.setString(1, "Sample Front Page 1");
            statement.setString(2, "front_page_picture_1.jpg");
            statement.setString(3, "Sample Back Page 1");
            statement.setString(4, "back_page_picture_1.jpg");
            statement.setInt(5, 1);
            statement.executeUpdate();

            statement.setString(1, "Sample Front Page 2");
            statement.setString(2, "front_page_picture_2.jpg");
            statement.setString(3, "Sample Back Page 2");
            statement.setString(4, "back_page_picture_2.jpg");
            statement.setInt(5, 2);
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

    /**
     * Atempts to get a profile with the given email and password from the database.
     * Gets all the owned decks of the profile.
     *
     * @param email email
     * @param password password
     * @return the profile if found, null otherwise
     */
    public Profile getProfile(String email, String password) {
        String getProfileQuery = SqlQueries.getProfileQuery(email, password);
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
                Deck d = new Deck(name, deckId);

                ResultSet cardResultSet = connection
                    .createStatement()
                    .executeQuery(SqlQueries.getCardsQuery(deckId));
                while (cardResultSet.next()) {
                    int cardId = cardResultSet.getInt("card_id");
                    String frontPage = cardResultSet.getString("front_page");
                    String frontPagePic = cardResultSet.getString("front_page_picture");
                    String backPage = cardResultSet.getString("back_page");
                    String backPagePic = cardResultSet.getString("back_page_picture");
                    d.addCard(new Card(cardId, frontPage, backPage, frontPagePic, backPagePic));
                }
                decks.add(d);

            }
            return new Profile(profileId, emailResult, passwordResult,
                firstname, lastname, school, isAdmin, decks);

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
     * Deletes a prfile from the database. 
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
     * @param deck the deck to add
     */
    public void addNewDeck(int profileId, Deck deck) {

        String query = SqlQueries.addNewDeckQuery(profileId, deck.getDeckName());

        try {
            Statement statement = this.connection.createStatement();
            statement.execute(query);

        } catch (SQLException e) {
            e.printStackTrace();
        }

        //find out which ID was given to the new deck
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
     * Update a deck in the database. 
     *
     * @param deck the deck to update
     */
    public void updateDeck(Deck deck) {
        String getOwnerQuery = "SELECT owner_id FROM deck WHERE deck_id ="
            + Integer.toString(deck.getDeckId()) + ";";
        try {
            ResultSet result = connection.createStatement().executeQuery(getOwnerQuery);
            int ownerId = result.getInt("owner_id");
            this.deleteDeck(deck.getDeckId());
            this.addNewDeck(ownerId, deck);

        } catch (SQLException e) {
            e.printStackTrace();
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

<<<<<<< backend/db/src/main/java/db/DbConnection.java

    public ArrayList<Profile> getAllProfiles() {
        ArrayList<Profile> profiles = new ArrayList<Profile>();
        String query = SqlQueries.getAllProfileIDs();

        try {
            Statement statement = this.connection.createStatement();
            ResultSet result = statement.executeQuery(query);
            while(result.next()){
            int profileId = result.getInt("profile_id");
            String emailResult = result.getString("email");
            String passwordResult = result.getString("password");
            String firstname = result.getString("firstname");
            String lastname = result.getString("lastname");
            String school = result.getString("school");
            boolean isAdmin = result.getBoolean("is_admin");

            ResultSet deckResultSet = connection
                .createStatement()
                .executeQuery(SqlQueries.getOwnedDecksQuery(profileId));
            List<Deck> decks = new ArrayList<>();
            while (deckResultSet.next()) {
                String name = deckResultSet.getString("name");
                int deckId = deckResultSet.getInt("deck_id");
                Deck d = new Deck(name, deckId);

                ResultSet cardResultSet = connection
                    .createStatement()
                    .executeQuery(SqlQueries.getCardsQuery(deckId));
                while (cardResultSet.next()) {
                    int cardId = cardResultSet.getInt("card_id");
                    String frontPage = cardResultSet.getString("front_page");
                    String frontPagePic = cardResultSet.getString("front_page_picture");
                    String backPage = cardResultSet.getString("back_page");
                    String backPagePic = cardResultSet.getString("back_page_picture");
                    d.addCard(new Card(cardId, frontPage, backPage, frontPagePic, backPagePic));
                }
                decks.add(d);
            }
            Profile profile = new Profile(profileId, emailResult, passwordResult,
            firstname, lastname, school, isAdmin, decks);
            profiles.add(profile);
            }
            return profiles;
        } catch (SQLException e) {
            e.printStackTrace();
            return new ArrayList<Profile>();        }
    }

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
                Deck d = new Deck(name, deckId);

                ResultSet cardResultSet = connection
                    .createStatement()
                    .executeQuery(SqlQueries.getCardsQuery(deckId));
                while (cardResultSet.next()) {
                    int cardId = cardResultSet.getInt("card_id");
                    String frontPage = cardResultSet.getString("front_page");
                    String frontPagePic = cardResultSet.getString("front_page_picture");
                    String backPage = cardResultSet.getString("back_page");
                    String backPagePic = cardResultSet.getString("back_page_picture");
                    d.addCard(new Card(cardId, frontPage, backPage, frontPagePic, backPagePic));
                }
                decks.add(d);
            }
            System.out.println(decks + "test");
            return new Profile(profileId, emailResult, passwordResult,
                firstname, lastname, school, isAdmin, decks);
    } catch(SQLException e) {
        e.printStackTrace();
        return null;
    }