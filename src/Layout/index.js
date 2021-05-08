import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch, useParams } from "react-router-dom";
import LandingPage from "./LandingPage";
import CreateDeck from "./CreateDeck";
import Study from "./Study";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck";
import CreateEditCard from "./CreateEditCard";

function Layout() {
  const [decks, setDecks] = useState([]);
  const { deckId } = useParams();

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <LandingPage decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CreateEditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateEditCard deckId={deckId} decks={decks} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
