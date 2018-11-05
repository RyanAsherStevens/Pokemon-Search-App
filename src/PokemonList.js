import React, { Component } from 'react';
import { Link } from "react-router-dom";

class PokemonList extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      search: ""
    }
  }

  async componentDidMount() {
    const res = await  fetch('https://pokeapi.co/api/v2/pokemon/')
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

  render() {
    const results = this.generateSearchResults(this.state.search)
    return (
      <div className="App">
        <div className="search">
            <label>Who's that Pokemon?</label>
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