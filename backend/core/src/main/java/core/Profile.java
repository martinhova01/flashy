package core;

import java.util.ArrayList;
import java.util.List;

/**
 * Dummy class.
 */
public class Profile {

    private String email;
    private String firstname;
    private String lastname;
    private Boolean isAdmin;

    private List<Deck> ownedDecks;
    

    public Profile(String email, String firstname, String lastname, Boolean isAdmin) {
        this.email=email;
        this.firstname=firstname;
        this.lastname=lastname;
        this.isAdmin=isAdmin;
        this.ownedDecks = new ArrayList<>();
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

    
}
