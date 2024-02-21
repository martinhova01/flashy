package core;

/**
 * Class to store data about one flashcard-card.
 * 
 */
public class Card {
    
    private int cardNumber;
    private String frontpageString;
    private String backpageString;
    private String frontpagePicture;
    private String backpagePicture;

    /**
     * Constructor. 
     */
    public Card(int cardNumber, String frontpageString,
        String backpageString, String frontpagePicture, String backpagePicture) {
        this.cardNumber = cardNumber;
        this.frontpageString = frontpageString;
        this.backpageString = backpageString;
        this.frontpagePicture = frontpagePicture;
        this.backpagePicture = backpagePicture;

    }

    public Card() {
        
    }
    
    public int getCardNumber() {
        return cardNumber;
    }

    public String getFrontpageString() {
        return frontpageString;
    }

    public String getBackpageString() {
        return backpageString;
    }

    public String getFrontpagePicture() {
        return frontpagePicture;
    }

    public String getBackpagePicture() {
        return backpagePicture;
    }

    public void setCardNumber(int cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void setFrontpageString(String frontpageString) {
        this.frontpageString = frontpageString;
    }

    public void setBackpageString(String backpageString) {
        this.backpageString = backpageString;
    }

    public void setFrontpagePicture(String frontpagePicture) {
        this.frontpagePicture = frontpagePicture;
    }

    public void setBackpagePicture(String backpagePicture) {
        this.backpagePicture = backpagePicture;
    }

}
