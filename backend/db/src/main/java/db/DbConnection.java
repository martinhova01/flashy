package db;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;



/**
 * Class that handles connection to the database.
 * (This is just an example on how to communicate with the databse)
 */
public class DbConnection {

    private static String filePath = 
        System.getProperty("user.home") + System.getProperty("file.separator") + "flashy.db";


    public boolean dbExits() {
        File databaseFile = new File(filePath);
        return databaseFile.exists();
    }


    /**
     * Creates db-file if it is not already created and fills db with mock data.
     */
    public void createDb() {
        try {
            if (dbExits()) {
                System.out.println("Database already exists");
                return;
            }

            Connection conn = DriverManager.getConnection("jdbc:sqlite:" + filePath);
            System.out.println("Connected to the SQLite database.");

            //TODO: Fill database with mock-data

            conn.close();
           
        } catch (SQLException e) {
            System.out.println("SQLite connection error: " + e.getMessage());
        }
    }

    public void createUserInfoTable() {
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + filePath);
             java.sql.Statement stmt = conn.createStatement()) {
            
            String sql = "CREATE TABLE IF NOT EXISTS userinfo (\n"
                         + " id INTEGER PRIMARY KEY,\n"
                         + " username TEXT NOT NULL,\n"
                         + " email TEXT NOT NULL\n"
                         + ");";
            stmt.execute(sql);
            
            System.out.println("Userinfo table created successfully.");
        } catch (SQLException e) {
            System.out.println("Error creating userinfo table: " + e.getMessage());
        }
    }

    public void addUser(String username, String email) {
        String sql = "INSERT INTO userinfo(username, email) VALUES(?, ?)";
        
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + filePath);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, username);
            pstmt.setString(2, email);
            pstmt.executeUpdate();
            
            System.out.println("User added successfully.");
        } catch (SQLException e) {
            System.out.println("Error adding user: " + e.getMessage());
        }
    }

    public void getUser(String username) {
        String sql = "SELECT * FROM userinfo WHERE username = ?";
        
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + filePath);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                System.out.println("User found:");
                System.out.println("ID: " + rs.getInt("id"));
                System.out.println("Username: " + rs.getString("username"));
                System.out.println("Email: " + rs.getString("email"));
            } else {
                System.out.println("User not found.");
            }
        } catch (SQLException e) {
            System.out.println("Error getting user: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        DbConnection db = new DbConnection();
        db.createDb();
        db.createUserInfoTable();
        db.addUser("martinhova", "martin@mail.com");
        db.getUser("martinhova");
        db.getUser("johnDoe");

    }
}
