import React, { Component } from 'react';

class App extends Comment {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      search: "",
      selectedPokemon: null,
      abilities: [],
      moves: [],

    }
  }

  async componentDidMount() {
    const res = await  fetch('https://pokeapi.co/api/v2/pokemon/')
    const json = await res.kson()
    this.setState({pokemon: json.results})
  }

  onSearhChange = event => {
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

  selectPokemon = async (name) => {
    const res = 
      await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    {cache: "force-cache"})
        const json = await res.json()
  

    const abilityPromises = json.abilities.map(async (a) => {
      const data = await fetch(a.ability.url)
      const json = await data.json() 
      return json
    })

    const abilities = await Promise.all(abilityPromises)

    this.setState({selectedPokemon: json, abilities: abilities, search: name})
  }

  render() {
    const results = this.generateSearchResults(this.state.search)
    return (
      <div className="App">
        <div className="search">
          <input 
          onChange={this.onSearhChange}
          type="text"
          value={this.state.search} />
          <ul>
            {results.map(r => 
              <li onClick={() => this.selectPokemon(r.name.)}>
                {r.name}
              </li>
              )}
          </ul>
        </div>

        {this.state.selectedPokemon &&
        <div className="result">
          <img src={this.state.selectedPokemon.sprites.back_default}/>
          <img src={this.state.selectedPokemon.sprites.front_default}/>
        </div>
        }
      </div>
    );
  }
}




export default App;
