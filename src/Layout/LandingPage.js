import React from "react";
import { Link } from "react-router-dom";
import DeckDisplay from "./DeckDisplay";

const LandingPage = ({ decks, setDecks }) => {
  return (
    <div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-primary">
          + Create Deck
        </button>
      </Link>
      <br />
      <DeckDisplay decks={decks} setDecks={setDecks} />
    </div>
  );
};

export default LandingPage;
