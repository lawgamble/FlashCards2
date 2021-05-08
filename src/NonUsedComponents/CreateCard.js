import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import { createCard } from "../utils/api/index";

const CreateEditCard = () => {
  let history = useHistory();
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const newCard = { front: cardFront, back: cardBack };

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  function goToDeck() {
    history.push(`/decks/${deckId}`);
  }
  const frontSideChangeHandler = (event) => {
    setCardFront(event.target.value);
  };
  const backSideChangeHandler = (event) => {
    setCardBack(event.target.value);
  };

  async function saveCardHandler() {
    await createCard(deckId, newCard);
    goToDeck();
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}/`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <br />
      <h2>{deck.name}: Create Card Form</h2>
      <br />
      <form>
        <div className="form-group">
          <label for="exampleFormControlTextarea1">Front:</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            type="text"
            placeholder="Front Side of Card"
            onChange={frontSideChangeHandler}
          ></textarea>
          <br />
          <label for="exampleFormControlTextarea1">Back:</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            type="text"
            placeholder="Back Side of Card"
            onChange={backSideChangeHandler}
          ></textarea>
        </div>
      </form>
      <a className="btn btn-primary" href={`/decks/${deckId}`} role="button">
        Done
      </a>{" "}
      <button
        type="button"
        className="btn btn-success"
        onClick={saveCardHandler}
      >
        Save Card
      </button>
    </div>
  );
};

export default CreateEditCard;
