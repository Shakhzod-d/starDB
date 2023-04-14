import React, { Component } from "react";

import Header from "./components/header/header";
import SwapiService from "./services/swapi-service";
import ErrorBoundry from "./components/error-boundry/error-boundry";
import RandomPlanet from "./components/random-planet/random-planet";
import DummySwapiService from "./services/dummy-swapi-service";
import { SwapiServiceProvider } from "./components/swapi-service-context/swapi-service-context";
import { PeoplePage, PlanetsPage, StarshipsPage } from "./components/pages";

import "./App.css";

import "bootswatch/dist/darkly/bootstrap.min.css";

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return { swapiService: new Service() };
    });
  };

  render() {
    const { onServiceChange } = this;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app container">
            <Header onServiceChange={onServiceChange} />
            <RandomPlanet />
            <PeoplePage />
            <PlanetsPage />
            <StarshipsPage />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
