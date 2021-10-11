import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Study from "./Study";
import DeckView from "./DeckView";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

function Layout() {
  //entire deck list state managed at highest level. All routing done on Layout.
  const [currentDecks, setCurrentDecks] = useState([]);
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home
              currentDecks={currentDecks}
              setCurrentDecks={setCurrentDecks}
            />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck setCurrentDecks={setCurrentDecks} />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView setCurrentDecks={setCurrentDecks} />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;