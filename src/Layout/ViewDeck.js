import React, { useState, useEffect } from "react";
import {
  listCards,
  readDeck,
  deleteCard,
  deleteDeck,
} from "./../utils/api/index";
import { useParams, useHistory, Link } from "react-router-dom";

const ViewDeck = () => {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      const deckDisplay = await readDeck(deckId);
      setDeck(deckDisplay);
      setCards(deckDisplay.cards);
    }
    loadDeck();
  }, [deckId]);

  function deleteHandler(cardId) {
    const deleteAlert = window.confirm(
      "You will not be able to recover the card!"
    );
    if (deleteAlert) {
      deleteCard(cardId);
      window.location.reload();
    }
  }

  function deckDeleteHandler(id) {
    const deleteAlert = window.confirm(
      "You will not be able to recover the deck!"
    );
    if (deleteAlert) {
      deleteDeck(id);
      history.push("/");
    }
  }

  const cardDisplay = cards.map((card, index) => (
    <div className="card" key={index}>
      <div className="card-body">
        <div>
          <span>
            <b>Front:</b> {card.front} <br />
          </span>
          <span>
            <b>Back:</b> {card.back} <br /> <br />
          </span>
        </div>
        <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
          <button className="btn btn-secondary">Edit</button>{" "}
        </Link>
        <button
          className="btn btn-danger float-right"
          onClick={() => deleteHandler(card.id)}
        >
          Delete
        </button>{" "}
      </div>
    </div>
  ));
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <b>{deck.name}</b>: Deck View
          </li>
        </ol>
      </nav>
      <br />
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <Link to={`/decks/${deckId}/edit`}>
        <button className="btn btn-secondary">Edit</button>{" "}
      </Link>
      <Link to={`/decks/${deckId}/study`}>
        <button className="btn btn-primary">Study</button>{" "}
      </Link>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button className="btn btn-primary">+ Add Cards</button>{" "}
      </Link>
      <button
        variant="danger "
        className="btn btn-danger float-right"
        onClick={() => deckDeleteHandler(deck.id)}
      >
        Delete
      </button>
      <hr />
      <h2>Cards:</h2>
      <div>{cardDisplay}</div>
    </div>
  );
};

export default ViewDeck;
