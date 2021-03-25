import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import MovieDetail from "./components/moviedetail/MovieDetail";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
    </main>
  );
}

export default App;
