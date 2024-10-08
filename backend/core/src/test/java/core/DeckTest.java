package core;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

/**
 * Testclass for Deck.
 *
 */
public class DeckTest {

    @Test
    public void testDeckCreation() {
        Deck deck = new Deck("Test Deck", 123, 0, "Annet", 10);
        assertEquals("Test Deck", deck.getDeckName());
        assertEquals(123, deck.getDeckId());
        assertTrue(deck.getCardList().isEmpty());
    }

    @Test
    public void testAddCard() {
        Deck deck = new Deck("Test Deck", 123, 0, "Annet", 10);
        Card card = new Card(1, "fp", "bp", "fpp", "bpp");
        deck.addCard(card);
        assertFalse(deck.getCardList().isEmpty());
        assertEquals(1, deck.getCardList().size());
        assertEquals(card, deck.getCardList().get(0));
    }

    @Test
    public void testRemoveTopCard() {
        Deck deck = new Deck("Test Deck", 123, 0, "Annet", 10);
        Card card1 = new Card(1, "s", "s", "s", "s");
        Card card2 = new Card(2, "d", "d", "d", "d");
        deck.addCard(card1);
        deck.addCard(card2);
        
        deck.removeTopCard();
        
        assertEquals(1, deck.getCardList().size());
        assertEquals(card2, deck.getCardList().get(0));
    }

    @Test
    public void testSetDeckNameAndId() {
        Deck deck = new Deck("Old Deck", 456, 0, "Annet", 10);
        assertEquals("Old Deck", deck.getDeckName());
        assertEquals(456, deck.getDeckId());

        deck.setDeckName("New Deck");
        deck.setDeckId(789);

        assertEquals("New Deck", deck.getDeckName());
        assertEquals(789, deck.getDeckId());
    }
}
