import React from "react";
import { useEffect } from "react";
import { listDecks, deleteDeck } from "../../utils/api";
import Deck from "./Deck";

/**
 * DeckList component with hook to render updated deck list.
 * Maps through list and uses Deck component to render 
 * JSX properly for each deck. 
 * 
 */

function DeckList({ currentDecks, setCurrentDecks }) {
  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      const response = await listDecks(abortController.signal);
      setCurrentDecks((prevState) => response);
    }

    loadDecks();

    return () => abortController.abort();
  }, [setCurrentDecks]);

  const deckCards = currentDecks.map((deck) => (
    <Deck
      deck={deck}
      key={deck.id}
      deleteDeck={deleteDeck}
      setCurrentDecks={setCurrentDecks}
    />
  ));

  return <>{deckCards}</>;
}

export default DeckList;