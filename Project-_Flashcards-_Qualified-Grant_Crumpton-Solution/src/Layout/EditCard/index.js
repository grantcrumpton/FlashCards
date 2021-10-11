import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardForm from "../CardForm";

/**
 * Shares @CardForm component with @AddCard
 * passing down unique props as needed.
 *
 * deck, card, and @formData state are created and tracked.
 *
 * Unique button handlers process changes or route user away as needed.
 *
 */

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const initialFormData = {
    id: cardId,
    front: "",
    back: "",
    deckId: deckId,
  };

  const [deckToEdit, setDeckToEdit] = useState({});
  const [cardToEdit, setCardToEdit] = useState({});
  const [formData, setFormData] = useState({ ...initialFormData });

  function handleFormChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    cardToEdit.front = formData.front;
    cardToEdit.back = formData.back;

    const ac = new AbortController();

    async function editCard() {
      const editedCard = await updateCard(cardToEdit, ac.signal);
      setCardToEdit(editedCard);
      history.push(`/decks/${deckId}`);
    }
    editCard();
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

  useEffect(() => {
    const ac = new AbortController();

    async function loadCard() {
      const response = await readCard(cardId, ac.signal);
      setCardToEdit(response);
      setFormData(response);
    }
    loadCard();
  }, [cardId]);

  if (!deckToEdit.id) {
    return null;
  }

  return (
    <>
      <div className="row">
        <div className="col col-md-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <span className="oi oi-home mr-1"></span>Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {`Deck ${deckToEdit.name}`}
              </li>
              <li className="breadcrumb-item " aria-current="page">
                {`Edit Card ${cardToEdit.id}`}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <h1 className="col-12">Edit Card</h1>
        <div className="col-6">
          <CardForm
            formName={formData.front}
            formNameChange={handleFormChange}
            formText={formData.back}
            formTextChange={handleFormChange}
            handleCancel={handleCancel}
            nameDesc={cardToEdit?.front}
            textDesc={cardToEdit?.back}
            handleSubmit={handleSubmit}
            inputName={`Front`}
            textAreaName={"Back"}
            buttonName={`Cancel`}
            submitButtonName={`Submit`}
          />
        </div>
      </div>
    </>
  );
}

export default EditCard;