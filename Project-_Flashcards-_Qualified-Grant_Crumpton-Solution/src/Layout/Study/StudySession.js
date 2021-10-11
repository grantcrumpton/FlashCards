import React from "react";
import StudyCard from "./StudyCard";

//minor JSX formatting before calling @StudyCard to render the card.

function StudySession({
  studyDeck,
  studyCards,
  front,
  setFront,
  cardPlace,
  setCardPlace,
}) {
  if (studyDeck.cards?.length < 3) {
    return null;
  }

  return (
    <div className="row">
      <h1 className="col-12">{`${studyDeck.name}: Study `}</h1>
      <div className="col col-md-5">
        <StudyCard
          studyCards={studyCards}
          front={front}
          setFront={setFront}
          cardPlace={cardPlace}
          setCardPlace={setCardPlace}
        />
      </div>
    </div>
  );
}

export default StudySession;