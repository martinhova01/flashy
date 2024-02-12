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
     * Generate SQL-query for getting a profile with given email and password.
     *
     * @param email email
     * @param password password
     * @return the SQL-query as a String
     */
    public static String getProfileQuery(String email, String password) {
        return String.format("SELECT * FROM profile WHERE email='%s' and password='%s'",
            email, password);
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

    
}
