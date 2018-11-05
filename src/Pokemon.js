import React, { Component } from 'react';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPokemon: null,
      abilities: [],
      moves: [],
      stats: []
    }
  }

  async componentDidMount() {
    const res =
        await fetch(
            `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.name}/`,
            { cache: "force-cache" })
            const json = await res.json()
  

    const abilityPromises = json.abilities.map(async (a) => {
      const data = await fetch(a.ability.url, {cache: "force-cache"})
      const json = await data.json() 
      return json
    })

    const abilities = await Promise.all(abilityPromises)

    const statsPromises = json.stats.map(async (s) => {
      const data = await fetch(s.stat.url, {cache: "force-cache"})
      const json = await data.json() 
      return json
    })

    const stats = await Promise.all(statsPromises)

    const movesPromises = json.moves.map(async (m) => {
      const data = await fetch(m.move.url, {cache: "force-cache"})
      const json = await data.json() 
      return json
    })

    const moves = await Promise.all(movesPromises)

    this.setState({selectedPokemon: json, abilities: abilities, stats: stats, moves: moves, search: name})
}

render() {
    return (
        <div>
            {this.state.selectedPokemon &&
            <div className="result">
                <img alt={this.state.selectedPokemon.sprites.back_default} 
                     src={this.state.selectedPokemon.sprites.back_default} />
                <img alt={this.state.selectedPokemon.sprites.back_default} 
                     src={this.state.selectedPokemon.sprites.front_default} />
                <img alt={this.state.selectedPokemon.sprites.back_default} 
                     src={this.state.selectedPokemon.sprites.back_shiny} />
                <img alt={this.state.selectedPokemon.sprites.back_default} 
                     src={this.state.selectedPokemon.sprites.front_shiny} />
                <h1 className="abilities">Abilities:</h1>
                <ul>
                {this.state.abilities.map(a => <p>{a.name}</p>)}
                </ul>
                <h1 className="Moves">Moves:</h1>
                <ul>
                {this.state.moves.map(m => <p>{m.name}</p>)}
                </ul>
                <h1 className="Stats">Stats:</h1>
                <ul>
                {this.state.stats.map(s => <p>{s.name}</p>)}
                </ul>
            </div>
            }
        </div>
    );
}





export default Pokemon;
