import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      search: "",
      selectedPokemon: null,
      abilities: [],
      moves: [],
      stats: []
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

  selectPokemon = async (name) => {
    const res = 
      await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}/`,
        {cache: "force-cache"})
        const json = await res.json()
  

    const abilityPromises = json.abilities.map(async (a) => {
      const data = await fetch(a.ability.url)
      const json = await data.json() 
      return json
    })

    const abilities = await Promise.all(abilityPromises)

    const statsPromises = json.stats.map(async (s) => {
      const data = await fetch(s.stat.url)
      const json = await data.json() 
      return json
    })

    const stats = await Promise.all(statsPromises)

    const movesPromises = json.moves.map(async (m) => {
      const data = await fetch(m.move.url)
      const json = await data.json() 
      return json
    })

    const moves = await Promise.all(movesPromises)

    this.setState({selectedPokemon: json, abilities: abilities, stats: stats, moves: moves, search: name, abilites, moves, stats})
  }

  render() {
    const results = this.generateSearchResults(this.state.search)
    return (
      <div className="App">
        <div className="search">
          <input 
          onChange={this.onSearchChange}
          type="text"
          value={this.state.search} />
          <ul>
            {results.map(r => 
              <li onClick={() => this.selectPokemon(r.name)}>
                {r.name}
              </li>
            )}
          </ul>
        </div>

        {this.state.selectedPokemon &&
        <div className="result">
          <img src={this.state.selectedPokemon.sprites.back_default}/>
          <img src={this.state.selectedPokemon.sprites.front_default}/>
          <img src={this.state.selectedPokemon.sprites.back_shiny}/>
          <img src={this.state.selectedPokemon.sprites.front_shiny}/>
        </div>
        }
      </div>
    );
  }
}




export default App;
