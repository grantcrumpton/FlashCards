import React from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import { useEffect, useState } from "react";
import StudySession from "./StudySession";
import AddMoreCards from "./AddMoreCards";

/**
 * Study initializes specific states to be referenced
 * during a study session.
 * @front is a boolean determines which card side is displayed.
 * 
 * @cardPlace is a number that determines which card is displayed.
 * 
 * @AddMoreCards is a component that only renders if a deck has insufficient cards.
 * 
 * @StudySession is a componenet that renders cards when studying. 
 * 
 */

function Study() {
  const { deckId } = useParams();

  const [studyDeck, setStudyDeck] = useState({});
  const [front, setFront] = useState(true);
  const [cardPlace, setCardPlace] = useState(1);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setStudyDeck((prevDeck) => response);
    }
    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  const cardsFromDeck = studyDeck.cards;

  if (!studyDeck.id) {
    return null;
  }

  return (
    <>
      <div className="row">
        <div className="col col-md-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <span className="oi oi-home mr-1"></span>Home
                </Link>
              </li>
              <li className="breadcrumb-item">{studyDeck.name}</li>
              <li className="breadcrumb-item active" aria-current="page">
                Study
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <AddMoreCards studyDeck={studyDeck} deckId={deckId} />
      <StudySession
        studyDeck={studyDeck}
        studyCards={cardsFromDeck}
        front={front}
        setFront={setFront}
        cardPlace={cardPlace}
        setCardPlace={setCardPlace}
      />
    </>
  );
}

export default Study;