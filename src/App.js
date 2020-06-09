import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// Importing App components
import Pokemon from './Pokemon';
import PokemonList from './PokemonList';
// import SelectedPokemon from './SelectedPokemon';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div className="App">
        <div className="col-xs-7 col-sm-6 col-lg-8">
          <Switch>
              <Route
                path="/pokemon/:name"
                render={props => (
                  <Pokemon key={props.match.params.name} {...props} />
                )}
              />
              <Route exact path="/" component={PokemonList} />
              <Route path="/pokemon" component={PokemonList} />
            </Switch>
        </div>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;