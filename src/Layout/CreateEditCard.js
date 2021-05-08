import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import { readDeck, readCard } from "../utils/api/index";
import { updateCard } from "../utils/api/index";
import { createCard } from "../utils/api/index";

const CreateEditCard = () => {
  let history = useHistory();
  let location = useLocation();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState([]);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const newCard = { front: cardFront, back: cardBack };

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  useEffect(() => {
    if (cardId) {
      readCard(cardId).then(setCard);
    }
  }, [cardId]);

  function goToDeck() {
    history.push(`/decks/${deckId}`);
  }

  function frontChangeHandler(event) {
    const newFront = event.target.value;
    setCardFront(newFront);
  }
  function backChangeHandler(event) {
    const newBack = event.target.value;
    setCardBack(newBack);
  }

  const frontSideChangeHandler = (event) => {
    setCardFront(event.target.value);
  };
  const backSideChangeHandler = (event) => {
    setCardBack(event.target.value);
  };

  async function saveHandler() {
    const newCard = {
      id: card.id,
      front: cardFront,
      back: cardBack,
      deckId: deckId,
    };

    await updateCard(newCard);
    goToDeck();
  }

  async function saveCardHandler() {
    await createCard(deckId, newCard);
    goToDeck();
  }

  const editCardForm = (
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
            Edit Card
          </li>
        </ol>
      </nav>
      <br />
      <h2>{deck.name}: Edit Card Form</h2>
      <br />
      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Front:</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            defaultValue={card.front}
            onChange={frontChangeHandler}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Back:</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            defaultValue={card.back}
            onChange={backChangeHandler}
          ></textarea>
        </div>
      </form>
      <Link to={`/decks/${deckId}`}>
        <button className="btn btn-primary">Done</button>{" "}
      </Link>
      <button className="btn btn-success" onClick={saveHandler}>
        Save Card
      </button>{" "}
    </div>
  );

  const createCardForm = (
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
          <label htmlFor="exampleFormControlTextarea1">Front:</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            type="text"
            placeholder="Front Side of Card"
            onChange={frontSideChangeHandler}
          ></textarea>
          <br />
          <label htmlFor="exampleFormControlTextarea1">Back:</label>
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
  return (
    <div>
      {location.pathname.includes(`decks/${deckId}/cards/${cardId}/edit`)
        ? editCardForm
        : createCardForm}
    </div>
  );
};

export default CreateEditCard;
