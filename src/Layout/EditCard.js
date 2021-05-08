import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, readCard } from "../utils/api/index";
import { updateCard } from "../utils/api/index";

const EditCard = () => {
  let history = useHistory();
  const [deck, setDeck] = useState([]);
  const { deckId, cardId } = useParams();
  const [card, setCard] = useState([]);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  useEffect(() => {
    readCard(cardId).then(setCard);
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

  async function saveHandler() {
    const newCard = {
      id: card.id,
      front: cardFront,
      back: cardBack,
      deckId: deckId,
    };
    console.log("saveHandler newCard: ", newCard);
    await updateCard(newCard);
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
            Edit Card
          </li>
        </ol>
      </nav>
      <br />
      <h2>{deck.name}: Edit Card Form</h2>
      <br />
      <form>
        <div className="form-group">
          <label for="exampleFormControlTextarea1">Front:</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            defaultValue={card.front}
            onChange={frontChangeHandler}
          ></textarea>
        </div>
        <div className="form-group">
          <label for="exampleFormControlTextarea1">Back:</label>
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
};

export default EditCard;
