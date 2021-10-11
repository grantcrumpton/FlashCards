import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api";

/**
 * Uses props to create JSX for individual cards in the @DeckView component.
 * Button handler for deletion is created and a link to the @EditCard component is provided.
 *
 */

function CardView({ deckId, cardId, front, back }) {
  const history = useHistory();

  function deleteCardHandler() {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    console.log("deleted");
    const ac = new AbortController();
    async function removeCard() {
      await deleteCard(cardId, ac.signal);
      history.push(`/`);
    }
    removeCard();
  }

  return (
    <li>
      <div className="card">
        <div className="card-body">
          <div className="col-6 float-left">
            <p>{front}</p>
          </div>
          <div className="col-6 float-right">
            <p>{back}</p>
          </div>
          <div>
            <button
              className="btn btn-danger float-right"
              onClick={deleteCardHandler}
            >
              <span className="oi oi-trash"></span>
            </button>
            <Link to={`${deckId}/cards/${cardId}/edit`}>
              <button className="btn btn-secondary float-right">
                <span className="oi oi-pencil mr-2"></span>
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CardView;