import React, { useEffect, useState } from "react";
import { readDeck } from "./../utils/api";
import { useParams } from "react-router-dom";
import StudyCard from "./StudyCard";

const Study = () => {
  const [studyDisplay, setStudyDisplay] = useState({});
  const [deckCards, setDeckCards] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    async function callDeck() {
      const display = await readDeck(deckId);
      setStudyDisplay(display);
      setDeckCards(display.cards);
    }
    callDeck();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}/`}>{studyDisplay.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <br />
      <h2>Study: {studyDisplay.name}</h2>
      <br />
      <StudyCard
        deckCards={deckCards}
        studyDisplay={studyDisplay}
        deckId={deckId}
      />
    </div>
  );
};

export default Study;
