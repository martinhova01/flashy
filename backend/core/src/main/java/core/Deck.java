package core;

import java.util.ArrayList;
import java.util.List;

/**
 * Class to store data about a flashcard-deck.
 */
public class Deck {

    private String deckName;
    private int deckId;
    private boolean visibility;
    private String category;

    private List<Card> cardList;

    /**
     * Constructor.
     */
    public Deck(String deckName, int deckId, boolean visibility, String category) {
        this.deckName = deckName;
        this.deckId = deckId;
        this.visibility = visibility;
        this.category = category;
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

    public boolean getVisibility() {
        return visibility;
    }

    public void setPublic(boolean visibility) {
        this.visibility = visibility;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    

}
