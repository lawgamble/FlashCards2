import React, { useEffect } from "react";
import { listDecks } from "./../utils/api/index";
import { deleteDeck } from "./../utils/api/index";
import { Link } from "react-router-dom";

const DeckDisplay = ({ decks, setDecks }) => {
  useEffect(() => {
    listDecks().then(setDecks);
  }, [setDecks]);

  async function deleteHandler(id) {
    const deleteAlert = window.confirm(
      "You will not be able to recover the deck!"
    );
    if (deleteAlert) {
      deleteDeck(id);
      window.location.reload();
    }
  }

  return (
    <div>
      {decks.map((deck, index) => (
        <div className="card" key={index} style={{ width: "50rem" }}>
          <div className="card-body">
            <h5 className="card-title">
              {deck.name}{" "}
              <div className="float-right">{deck.cards.length} cards</div>
            </h5>
            <p className="card-text">{deck.description}</p>
            <Link to={`decks/${deck.id}`}>
              <button type="button" className="btn btn-secondary">
                View
              </button>{" "}
            </Link>
            <Link to={`decks/${deck.id}/study`}>
              <button type="button" className="btn btn-primary">
                Study
              </button>{" "}
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteHandler(deck.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeckDisplay;
