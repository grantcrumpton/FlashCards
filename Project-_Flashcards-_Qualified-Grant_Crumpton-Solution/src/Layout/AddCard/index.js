import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "../CardForm";

/**
 * Shares @CardForm component with @EditCard
 * passing down unique props as needed.
 *
 * deck and @formData state are created and tracked.
 *
 * Unique button handlers process changes or route user away as needed.
 *
 */

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialFormData = { front: "", back: "", deckId: deckId };

  const [deckToEdit, setDeckToEdit] = useState({});
  const [formData, setFormData] = useState({ ...initialFormData });

  function handleFormChange(event) {
    console.log(formData);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData);
  }

  function handleDone() {
    history.push(`/decks/${deckId}`);
  }

  function handleSave(event) {
    event.preventDefault();
    createCard(deckId, { ...formData }).then((card) =>
      setFormData({ ...initialFormData })
    );
  }

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeckToEdit((prevDeck) => response);
    }
    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  if (!deckToEdit.id) {
    return null;
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
                {deckToEdit.name}
              </li>
              <li className="breadcrumb-item " aria-current="page">
                Add Card
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <h1 className="col-12">{`${deckToEdit.name}: Add Card`}</h1>
        <div className="col-6">
          <CardForm
            formName={formData.front}
            formNameChange={handleFormChange}
            formText={formData.back}
            formTextChange={handleFormChange}
            handleCancel={handleDone}
            nameDesc={"Front side of card"}
            textDesc={"Back side of card"}
            handleSubmit={handleSave}
            inputName={`Front`}
            textAreaName={"Back"}
            buttonName={`Done`}
            submitButtonName={`Save`}
          />
        </div>
      </div>
    </main>
  );
}

export default AddCard;