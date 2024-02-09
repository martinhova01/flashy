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
    public String getProfileQuery(int profileId) {
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
    public String addProfileQuery(String email, String firstName, String lastName, String school) {
        return String.format("INSERT INTO profile (email, firstname, lastname, school, is_admin) "
            + "VALUES ('%s', '%s', '%s', '%s', %b)",
            email, firstName, lastName, school, false);
    }

    /**
     * Generate SQL-query for deleting a profile with a given ID.
     *
     * @param profileId the ID of the profile to delete.
     * @return the SQL-query as a String
     */
    public String deleteProfileQuery(int profileId) {
        return String.format("DELETE FROM profile WHERE profile_id=%s",
            Integer.toString(profileId));
    }

    /**
     * Generate SQL-query for updating a profile with a given ID.
     *
     * @param profileId the ID of the profile to update
     * @param email email
     * @param firstName first name
     * @param lastName last name
     * @param school school
     * @param isAdmin is_admin
     * @return the SQL-query as a String
     */
    public String updateProfileQuery(
        int profileId,
        String email,
        String firstName,
        String lastName,
        String school,
        boolean isAdmin) {

        return String.format("UPDATE profile "
            + "SET email='%s', firstname='%s', lastname='%s', school='%s', is_admin=%b "
            + "WHERE profile_id=%s",
            email, firstName, lastName, school, isAdmin, Integer.toString(profileId));     
    }
    
}
