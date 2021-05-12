import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "./../utils/api/index";

const EditDeck = () => {
  let history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  useEffect(() => {
    setTitle(title);
    setDescription(description);
  }, [description, title]);

  function goToDeck() {
    history.push(`/decks/${deckId}`);
  }
  async function updateDeckHandler() {
    await updateDeck({ name: title, description: description, id: deck.id });
    goToDeck();
  }

  function titleChangeHandler(event) {
    const newTitle = event.target.value;
    setTitle(newTitle);
  }
  function descriptionChangeHandler(event) {
    const newDescription = event.target.value;
    setDescription(newDescription);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h3>Edit Deck</h3>
      <br />
      <br />
      <form>
        <div className="form-group">
          <label></label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            defaultValue={deck.name}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="form-group">
          <label></label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            defaultValue={deck.description}
            onChange={descriptionChangeHandler}
          ></textarea>
        </div>
      </form>
      <Link to="/">
        <button className="btn btn-secondary">Cancel</button>{" "}
      </Link>
      <button className="btn btn-primary" onClick={updateDeckHandler}>
        Submit
      </button>{" "}
    </div>
  );
};

export default EditDeck;
