import React from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";

//HomePage takes and passes deck list state to child components.

function Home({ currentDecks, setCurrentDecks }) {
  return (
    <main>
      <div className="row">
        <div className="col-12">
          <Link to="/decks/new" role="button" className="btn btn-secondary">
            <span className="oi oi-plus mr-1"></span> Create Deck
          </Link>
        </div>
        <div className="row">
          <DeckList
            currentDecks={currentDecks}
            setCurrentDecks={setCurrentDecks}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;