package db;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;



/**
 * Class that handles connection to the database.
 */
public class DbConnection {

    private static String filePath = 
        System.getProperty("user.home") + System.getProperty("file.separator") + "flashy.db";


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
    private void runSqlFile(Connection conn) {
        try (Statement stmt = conn.createStatement()) {
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
     * Creates db-file if it is not already created and fills db with tables.
     */
    public void createDb() {
        try {
            if (dbExits()) {
                System.out.println("Database already exists");
                return;
            }

            Connection conn = DriverManager.getConnection("jdbc:sqlite:" + filePath);
            System.out.println("Connected to the SQLite database.");

            // Run SQL file to create tables and seeds data into tables
            runSqlFile(conn);
            seedData();

            conn.close();

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
        Connection conn = DriverManager.getConnection("jdbc:sqlite:" + filePath);
        seedDecks(conn);
        seedProfiles(conn);
        seedCards(conn);
        seedOwners(conn);
        seedUserLikes(conn);
        seedFavorites(conn);
        System.out.println("Sample data seeded successfully.");
    }

    private void seedDecks(Connection connection) {
        String insertQuery = "INSERT INTO deck (name) VALUES (?)";
        try (PreparedStatement statement = connection.prepareStatement(insertQuery)) {
            statement.setString(1, "Sample Deck 1");
            statement.executeUpdate();

            statement.setString(1, "Sample Deck 2");
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void seedProfiles(Connection connection) {
        String insertQuery =
            "INSERT INTO profile (email, firstname, lastname, school, is_admin) "
            + "VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(insertQuery)) {
            statement.setString(1, "user1@example.com");
            statement.setString(2, "John");
            statement.setString(3, "Doe");
            statement.setString(4, "NTNU");
            statement.setBoolean(5, false);
            statement.executeUpdate();

            statement.setString(1, "admin@example.com");
            statement.setString(2, "Admin");
            statement.setString(3, "User");
            statement.setString(4, "Admin");
            statement.setBoolean(5, true);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void seedCards(Connection connection) {
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

    private void seedOwners(Connection connection) {
        String insertQuery = "INSERT INTO owner (deck_id, profile_id) VALUES (?, ?)";
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

    private void seedUserLikes(Connection connection) {
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

    private void seedFavorites(Connection connection) {
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


    

    public static void main(String[] args) throws SQLException {
        DbConnection db = new DbConnection();
        db.createDb();
    }
}
