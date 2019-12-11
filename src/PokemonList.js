import React, { Component } from 'react';
import { Link } from "react-router-dom";

// fetching the full pokemon list from the api and making the search bar

class PokemonList extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      search: ""
    }
  }

  async componentDidMount() {
    const res = await  fetch("https://pokeapi.co/api/v2/pokemon/?offset=1&limit=964")
    const json = await res.json()
    this.setState({pokemon: json.results})
  }

  onSearchChange = event => {
    this.setState({search: event.target.value})
  }

  generateSearchResults = search => {
    if (search === "") {
      return []
    } else {
      return this.state.pokemon
        .filter(p => p.name.includes(search))
        .slice(0, 10)
    }
  }

//   Rendering those results and also creating a Pokemon ID for each of them to be clicked on to pull up the moves, stats, and abilities called in Pokemon.js

  render() {
    const results = this.generateSearchResults(this.state.search)
    return (
      <div className="App">
        <div className="search">
            <label className="title">Who's that Pokemon?</label>
                <p className="info">Type in your favorite Pokemon to find out it's abilities, moves, and base stats!</p>
          <input 
          onChange={this.onSearchChange}
          type="text"
          value={this.state.search} />
          <ul>
          {results.map(r => 
            <li key={r.name}>
              <Link to={`/pokemon/${r.name}`}>
                {r.name}
              </Link>
            </li>
          )}
          </ul>
        </div>
      </div>
    );
  }
}

export default PokemonList;