package core;

import java.util.ArrayList;
import java.util.List;

/**
 * Class to store data about a profile.
 */
public class Profile {

    private int profileId;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String school;
    private Boolean isAdmin;

    private List<Deck> ownedDecks;


    public Profile() {

    }

    /**
     * Constructor.
     */
    public Profile(int profileId, String email, String password,
        String firstname, String lastname, String school, Boolean isAdmin) {
        this.profileId = profileId;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.school = school;
        this.isAdmin = isAdmin;
        this.ownedDecks = new ArrayList<>();
    }

    public Profile(int profileId, String email, String password,
        String firstname, String lastname, String school, Boolean isAdmin, List<Deck> ownedDecks) {
        this(profileId, email, password, firstname, lastname, school, isAdmin);
        this.ownedDecks = ownedDecks;
    }

    public int getProfileId() {
        return profileId;
    }

    public void setProfileId(int profileId) {
        this.profileId = profileId;
    }

    public List<Deck> getOwnedDecks() {
        return ownedDecks;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public Boolean isAdmin() {
        return isAdmin;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    

    
}
