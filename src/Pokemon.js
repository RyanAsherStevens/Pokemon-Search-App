import React, { Component } from 'react';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPokemon: null,
      abilities: [],
      moves: [],
      stats: [],
      types: [],
      regions: []
    }
  }
// mounting the components and making the initial fetch to the API
  async componentDidMount() {
    const res =
        await fetch(
            `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.name}/`,
            { cache: "force-cache" })
            const json = await res.json()
  
// fetching the abilites from the Pokemon api

    const abilityPromises = json.abilities.map(async (a) => {
      const data = await fetch(a.ability.url, {cache: "force-cache"})
      const json = await data.json() 
      return json
    })

    const abilities = await Promise.all(abilityPromises)
// End of Abilities

// Fetching stats from the api
    const statsPromises = json.stats.map(async (s) => {
      const data = await fetch(s.stat.url, {cache: "force-cache"})
      const json = await data.json() 
      return json
    })

    const stats = await Promise.all(statsPromises)
// End of stats

// Fetching moves from the api
    const movesPromises = json.moves.map(async (m) => {
      const data = await fetch(m.move.url, {cache: "force-cache"})
      const json = await data.json() 
      return json
    })

    const moves = await Promise.all(movesPromises)
// End of moves

// Fetching type from the api
const typesPromises = json.types.map(async (t) => {
    const data = await fetch(t.type.url, {cache: "force-cache"})
    const json = await data.json() 
    return json
  })

  const types = await Promise.all(typesPromises)
// End of type

// Fetching nature from the api
const regionsPromises = json.regions.map(async (r) => {
    const data = await fetch(r.region.url, {cache: "force-cache"})
    const json = await data.json() 
    return json
  })

  const regions = await Promise.all(regionsPromises)
// End of nature

    this.setState({selectedPokemon: json, abilities: abilities, stats: stats, moves: moves, types: types, regions: regions})
}
// Rendering the associated sprites according to the pokemon that is typed in, front and back with the normal colors and shiny.
    render() {
        return (
            <div>
                {this.state.selectedPokemon &&
                <div className="result">
                    <h1 className="Pokemon">
                        {this.props.match.params.name}
                    </h1>
                    <div className="Sprites">
                        <img alt={this.state.selectedPokemon.sprites.back_default} 
                            src={this.state.selectedPokemon.sprites.back_default} />
                        <img alt={this.state.selectedPokemon.sprites.back_default} 
                            src={this.state.selectedPokemon.sprites.front_default} />
                        <img alt={this.state.selectedPokemon.sprites.back_default} 
                            src={this.state.selectedPokemon.sprites.back_shiny} />
                        <img alt={this.state.selectedPokemon.sprites.back_default} 
                            src={this.state.selectedPokemon.sprites.front_shiny} />
                    </div>
    {/* Rendering each of the promises above: abilities, stats, and moves to the search results. 
    Also rendering the base values for stats and the associated effect of each ability. */}
                    <h1 className="abilities">Abilities:</h1>
                    <ul>
                        {this.state.abilities.map(a => 
                            <li key={a.name}>
                                <p>{a.name}</p> 
                                <p>{a.effect_entries.map(e => e.effect)}</p>
                            </li>
                        )}
                    </ul>
                    <h1 className="Moves">Moves:</h1>
                    <ul>
                        {this.state.moves.map(m => 
                            <li key={m.name}>{m.name}</li>
                        )}
                    </ul>
                    <h1 className="Stats">Stats:</h1>
                    <ul>
                        {this.state.selectedPokemon.stats.map(s => 
                            <li key={s.stat.name}>{s.stat.name} {s.base_stat}</li>
                        )}
                    </ul>
                    <h1 className="Types">Types:</h1>
                    <ul>
                        {this.state.types.map(t => 
                            <li key={t.name}>{t.name}</li>
                        )}
                    </ul>
                    <h1 className="Regions">Regions:</h1>
                    <ul>
                        {this.state.regions.map(r => 
                            <li key={r.name}>{r.name}</li>
                        )}
                    </ul>
                </div>
                }
            </div>
        );
    }
}


export default Pokemon;
