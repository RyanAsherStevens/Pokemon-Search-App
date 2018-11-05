import React from 'react';
import Pokemon from './Pokemon';
import PokemonList from './PokemonList';

<Route exact path="/" component={PokemonList} />
<Route path="/pokemon" component={PokemonList} />
<Route path="/pokemon/:id"
              render={props => (
                  <Pokemon key={props.match.params.id} {...props} />
               )}
/>

export default SelectedPokemon;