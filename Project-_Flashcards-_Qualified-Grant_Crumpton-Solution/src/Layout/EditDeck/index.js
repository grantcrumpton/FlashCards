import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import { updateDeck } from "../../utils/api";
import Form from "../DeckForm";

/**
 * Shares form with @CreateDeck component.
 * @formData state is created and filled once @useEffect hook resolves.
 * 
 * Unique button handlers are used to update deck info or return home.
 * 
 */

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialFormData = { name: "", description: "" };

  const [deckToEdit, setDeckToEdit] = useState({});
  const [formData, setFormData] = useState({ ...initialFormData });

  function handleFormChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleCancel() {
    history.push(`/decks/${deckToEdit.id}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateDeck({ ...formData, id: deckToEdit.id });
    history.push(`/decks/${deckId}`);
  }

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeckToEdit((prevDeck) => response);
      setFormData(response);
    }
    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  if (!deckToEdit.id) {
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
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={`/decks/${deckId}`}>Deck {deckToEdit.name}</Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <h1 className="col-12">{`${deckToEdit.name}`}</h1>
        <div className="col-6">
          <Form
            formName={formData.name}
            formNameChange={handleFormChange}
            formText={formData.description}
            formTextChange={handleFormChange}
            handleCancel={handleCancel}
            nameDesc={deckToEdit.name}
            textDesc={deckToEdit.description}
            handleSubmit={handleSubmit}
            inputName={`Name`}
            textAreaName={"Description"}
            buttonName={`Cancel`}
            submitButtonName={`Submit`}
          />
        </div>
      </div>
    </>
  );
}

export default EditDeck;