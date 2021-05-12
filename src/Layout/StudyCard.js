import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const StudyCard = ({ deckCards, deckId }) => {
  // console.log("StudyCard", deckCards);
  const [nextButton, setNextButton] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  let history = useHistory();

  const clickHandler = () => {
    setNextButton(!nextButton);
  };

  const lessThanThree = (
    <div>
      <h2>Not enough cards</h2>
      <p>
        {" "}
        You need at least 3 cards to study. There are only{" "}
        <code>{deckCards.length}</code> cards in this deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button className=" btn btn-success">+ Add Cards</button>
      </Link>
    </div>
  );

  function windowAlert() {
    const restartAlert = window.confirm(
      "Restart cards? Click cancel to return to the home page"
    );
    if (restartAlert) {
      setCardIndex(0);
    } else {
      history.push("/");
    }
  }

  function nextButtonHandler() {
    setNextButton(!nextButton);
    setCardIndex(cardIndex + 1);
    if (cardIndex + 1 === deckCards.length) {
      windowAlert();
    }
  }

  const deckCardsMapped = deckCards.map((card, index) => (
    <div>
      <div className="card" key={index} style={{ width: "32rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            Card {index + 1} of {deckCards.length}
          </h5>
          <p className="card-text">{nextButton ? card.back : card.front}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={clickHandler}
          >
            Flip
          </button>
          {nextButton && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={nextButtonHandler}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      {deckCards.length < 3 ? lessThanThree : deckCardsMapped[cardIndex]}
    </div>
  );
};
export default StudyCard;
