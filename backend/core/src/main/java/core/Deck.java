package core;

import java.util.ArrayList;
import java.util.List;

public class Deck {

    private String deckName;
    private int deckID;

    private List<Card> cardList;

    public Deck(String deckName, int deckID) {
        this.deckName = deckName;
        this.deckID = deckID;
        this.cardList = new ArrayList<>();
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

    public int getDeckID() {
        return deckID;
    }

    public void setDeckName(String deckName) {
        this.deckName = deckName;
    }

    public void setDeckID(int deckID) {
        this.deckID = deckID;
    }

}
