import React from "react";
import { Link } from "react-router-dom";

//informs user of insufficient cards and provides button to add more.

function AddMoreCards({ studyDeck, deckId }) {
  if (studyDeck.cards?.length > 2) {
    return null;
  }

  return (
    <div className="row">
      <h1 className="col-12">{`${studyDeck.name}: Study `}</h1>
      <h3 className="col-12">Not enough cards.</h3>
      <p className="col-12">{`You need at least 3 cards to study. There are ${studyDeck.cards?.length} cards in this deck.`}</p>
      <Link
        to={`/decks/${deckId}/cards/new`}
        role="button"
        className=" btn btn-primary m-1 ml-3"
      >
        <span className="oi oi-plus mr-1"></span> Add Cards
      </Link>
    </div>
  );
}

export default AddMoreCards;