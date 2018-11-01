import React, { Component } from 'react';

class App extends Comment {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      search: "",
      selectedPokemon: null,
      abilities: [],
      moves: []
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
  }

  
}




export default App;
