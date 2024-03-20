package core;

import java.util.ArrayList;
import java.util.List;

/**
 * Class to store data about a flashcard-deck.
 */
public class Deck {

    private String deckName;
    private int deckId;
    private int visibility;
    private String category;
    private int likes;

    private List<Card> cardList;

    /**
     * Constructor.
     */
    public Deck(String deckName, int deckId, int visibility, String category, int likes) {
        this.deckName = deckName;
        this.deckId = deckId;
        this.visibility = visibility;
        this.category = category;
        this.likes = likes;
        this.cardList = new ArrayList<>();
    }

    public Deck() {
        
    }

    public void addCard(Card card) {
        cardList.add(card);
    }

    public void removeTopCard() {
        cardList.remove(0);
    }

    public List<Card> getCardList() {
        return cardList;
    }

    public String getDeckName() {
        return deckName;
    }

    public int getDeckId() {
        return deckId;
    }

    public void setDeckName(String deckName) {
        this.deckName = deckName;
    }

    public void setDeckId(int deckId) {
        this.deckId = deckId;
    }

    public int getVisibility() {
        return visibility;
    }

    public void setPublic(int visibility) {
        this.visibility = visibility;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
    
    

}
