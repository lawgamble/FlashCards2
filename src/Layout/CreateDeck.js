import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "./../utils/api/index";

const CreateDeck = () => {
  let history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };
  function goHome() {
    history.push("/");
  }
  async function createDeckHandler() {
    await createDeck({ name: title, description: description });
    goHome();
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h3>Create Deck</h3>
      <br />
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Deck Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Name of Deck"
          onChange={titleChange}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          Description of Deck
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Brief Description of the deck"
          onChange={descriptionChange}
        ></textarea>
      </div>
      <Link to="/">
        <button type="button" className="btn btn-secondary">
          Cancel
        </button>{" "}
      </Link>
      <button
        type="button"
        className="btn btn-primary"
        onClick={createDeckHandler}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateDeck;
