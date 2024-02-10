package core;

public class Card {
    
    private int cardNumber;
    private String deckID;
    private String frontpageString;
    private String backpageString;
    private String frontpagePicture;
    private String backpagePicture;

    public Card(int cardNumber, String deckID, String frontpageString, String backpageString, String frontpagePicture, String backpagePicture) {
    this.cardNumber = cardNumber;
    this.deckID = deckID;
    this.frontpageString = frontpageString;
    this.backpageString = backpageString;
    this.frontpagePicture = frontpagePicture;
    this.backpagePicture = backpagePicture;

    }
    
    public int getCardNumber() {
        return cardNumber;
    }

    public String getDeckID() {
        return deckID;
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

    public void setDeckID(String deckID) {
        this.deckID = deckID;
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
