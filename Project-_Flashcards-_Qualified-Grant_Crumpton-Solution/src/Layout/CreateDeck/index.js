import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import Form from "../DeckForm";

/**
 * Creates and manages state for a new deck. Passes necessary props to @DeckForm in order to render the proper form data.
 * Custom change and button handlers are passed. 
 * 
 */

function CreateDeck({ setCurrentDecks }) {
  const history = useHistory();
  
  const [deckName, setDeckName] = useState("");
  const [deckText, setDeckText] = useState("");

  function deckNameChange(event) {
    setDeckName(event.target.value);
  }

  function deckTextChange(event) {
    setDeckText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    async function saveDeck() {
      const newDeck = await createDeck({
        name: deckName,
        description: deckText,
      });
      setCurrentDecks((prevState) => [...prevState, newDeck]);
      setDeckName("");
      setDeckText("");
    }

    saveDeck();
  }

  function handleCancel() {
    history.push("/");
  }

  return (
    <main>
      <div className="row">
        <div className="col col-md-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <span className="oi oi-home mr-1"></span>Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Deck
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <h1 className="col-12">Create Deck</h1>
        <div className="col-6">
          <Form
            formName={deckName}
            formNameChange={deckNameChange}
            formText={deckText}
            formTextChange={deckTextChange}
            handleCancel={handleCancel}
            nameDesc={`Deck Name`}
            textDesc={`Brief description of the deck`}
            handleSubmit={handleSubmit}
            inputName={`Name`}
            textAreaName={"Description"}
            buttonName={`Cancel`}
            submitButtonName={`Submit`}
          />
        </div>
      </div>
    </main>
  );
}

export default CreateDeck;