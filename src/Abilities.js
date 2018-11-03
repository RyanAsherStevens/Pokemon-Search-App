import React from 'react';

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
    const res = await  fetch('https://pokeapi.co/api/v2/ability/')
    const json = await res.json()
    this.setState({ability: json.results})
  }

  onSearchChange = event => {
    this.setState({search: event.target.value})
  }

  generateSearchResults = search => {
    if (search === "") {
      return []
    } else {
      return this.state.ability
        .filter(p => p.name.includes(search))
        .slice(0, 10)
    }
  }

  selectPokemon = async (name) => {
    const res = 
      await fetch(
        `https://pokeapi.co/api/v2/ability/${name}/`,
        {cache: "force-cache"})
        const json = await res.json()

const abilityPromises = json.abilities.map(async (a) => {
    const data = await fetch(a.ability.url)
    const json = await data.json() 
    return json
  })

  const abilities = await Promise.all(abilityPromises)

  this.setState({selectedPokemon: json, abilities: abilities, search: ability})

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
      </div>
    );
  }
}
export default Abilities;