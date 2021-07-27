import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "./CreateDeck";
import Study from "./Study";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck";
import CreateEditCard from "./CreateEditCard";
import DeckDisplay from "./DeckDisplay";
import RandomPage from "./RandomPage";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckDisplay />
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
            <CreateEditCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route path="/random">
            <RandomPage />
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
