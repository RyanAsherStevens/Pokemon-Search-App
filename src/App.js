import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// Importing App components
import Pokemon from './Pokemon';
import PokemonList from './PokemonList';
import SelectedPokemon from './SelectedPokemon';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Header />

      <Switch>
        <Route exact path="/" component={Pokemon} />
        <Route path="/pokemon" component={Pokemon} />
        <Route path="/selectedpokemon" component={SelectedPokemon} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;