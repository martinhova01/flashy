package core;

/**
 * Class to store comments.
 * 
 */
public class Comment {
    private String firstname;
    private String lastname;
    private String comment;

    /**
     * Constructor.
     */
    public Comment(String firstname, String lastname, String comment) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.comment = comment;
    }


    public String getFirstname() {
        return firstname;
    }


    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }


    public String getLastname() {
        return lastname;
    }


    public void setLastname(String lastname) {
        this.lastname = lastname;
    }


    public String getComment() {
        return comment;
    }


    public void setComment(String comment) {
        this.comment = comment;
    }



    


    
    

}
